const express = require('express');
const router = express.Router();

// Middlewares
const { registerSchema } = require('../../middleware/validation');
const { guest } = require('../../middleware/auth/auth');
// Services
const { register } = require('../../services/auth/user');
const { createOTP } = require('../../services/otp/otp');
const { sendVerification } = require('../../services/email/sendEmail');
const auth = require('../../services/auth/auth');

// Utils
const _ = require('../../utils');

router.post('/basic-user', guest, async (req, res, next) => {
  try {
    // Validate user request
    await registerSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    // Get properties from request
    const { email, firstname, lastname, phone, password } = req.body;

    // Register the user and returns new user
    const newUser = await register(email, firstname, lastname, phone, password);

    // Create OTP code
    const otp = await createOTP(newUser.email);

    // Send verification email
    // const emailSent = await sendVerification(
    //   newUser.email,
    //   newUser._id,
    //   otp.code
    // );

    auth.loginUser(req, newUser._id);

    return res.json({
      message: 'OK!',
      data: _.sanitizeUser(newUser),
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Middlewares
const { loginSchema } = require('../../middleware/validation');
const { guest, userIsLoggedIn } = require('../../middleware/auth/auth');
// Services
const { verify } = require('../../services/auth/user');
const auth = require('../../services/auth/auth');

router.post('/login', guest, async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    // Get properties from request
    const { email, password } = req.body;

    // Check user password and email
    const verifiedUser = await verify(email, password);

    auth.loginUser(req, verifiedUser._id);

    return res.json('OK!');
  } catch (err) {
    return next(err);
  }
});

router.post('/logout', userIsLoggedIn, (req, res, next) => {
  auth
    .logoutUser(req, res)
    .then(() => {
      res.json('OK!');
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;

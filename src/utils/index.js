const { compare } = require('bcryptjs');
const uniqid = require('uniqid');

module.exports = {
  error(status, message) {
    return {
      status,
      message,
    };
  },
  comparePasswords(password1, password2) {
    return compare(password1, password2);
  },
  createOTP(email) {
    return {
      email,
      code: uniqid(),
    };
  },
  getMailOptions(from, to, subject, text) {
    return {
      from,
      to,
      subject,
      text,
    };
  },
  sanitizeUser(user) {
    return {
      userID: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      email: user.email,
      verified: user.verified,
    };
  },
};

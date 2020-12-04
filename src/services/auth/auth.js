const _config = require('../../config');

// Login user
function loginUser(req, userID) {
  if (req.session) {
    req.session.userID = userID;
    req.session.createdAt = Date.now();
  }
}

// Logout user
function logoutUser(req, res) {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err);
      res.clearCookie(_config.sessionName);

      resolve();
    });
  });
}

// Check if user is logged in
function isLoggedIn(req) {
  return req.session.userID ? true : false;
}

module.exports = {
  loginUser,
  logoutUser,
  isLoggedIn,
};

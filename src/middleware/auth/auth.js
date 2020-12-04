const { create } = require('../../lib/db/models/User');
const auth = require('../../services/auth/auth');
const _ = require('../../utils');
const _config = require('../../config');
const { logoutUser } = require('../../services/auth/auth');

function guest(req, res, next) {
  if (auth.isLoggedIn(req)) {
    return next(_.error(400, 'You are already logged in!'));
  }

  next();
}

function userIsLoggedIn(req, res, next) {
  if (!auth.isLoggedIn(req)) {
    return next(_.error(400, 'You are not logged in!'));
  }

  next();
}

// Route guard dog
function authenticated(req, res, next) {
  if (!auth.isLoggedIn(req)) {
    return next(_.error(401, 'Unauthorized!'));
  }

  next();
}

// Log out users that have exceeded the absolute timeout
function active(req, res, next) {
  if (auth.isLoggedIn(req)) {
    const now = Date.now();
    const { createdAt } = req.session;

    if (now > createdAt + _config.sessionAbsoluteTimeout) {
      logoutUser(req, res, next)
        .then(() => {
          return next(_.error(401, 'Session expired'));
        })
        .catch((err) => {
          return next(err);
        });
    }
  }
  return next();
}

module.exports = {
  guest,
  userIsLoggedIn,
  authenticated,
  active,
};

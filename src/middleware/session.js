const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const _config = require('../config');

module.exports = session({
  secret: _config.sessionSecret,
  name: _config.sessionName,
  cookie: {
    maxAge: _config.sessionIdleTimeout,
    secure: _config.inProduction,
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: _config.dbURL,
  }),
});

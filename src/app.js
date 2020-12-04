// *** PACKAGES ***
const express = require('express');
const helmet = require('helmet');
const responseTime = require('response-time');
const createError = require('http-errors');

const _config = require('./config');

// *** INITIALIZE EXPRESS APP ***
const app = express();

// *** ADD CONFIG TO APP ***
app.appConfig = require('./config').app;

// *** MIDDLEWARE MODULES ***
// const httpLogger = require('./middleware/logger');
const corsMiddleware = require('./middleware/cors');
const session = require('./middleware/session');

// *** MIDDLEWARES ***
// before initializing express-session create a new session secret
app.use(session);
app.use(helmet());
app.use(responseTime());
app.use(express.json());
// app.use(httpLogger);
app.options('*', corsMiddleware);
app.use(corsMiddleware);

// Session Absolute Timeout
app.use(require('./middleware/auth/auth').active);

// *** ROUTES ***
app.use('/api/v1/ecommerce', require('./routes'));

// *** NOT FOUND ***
app.use('*', (req, res, next) => [next(createError(404))]);

// *** ERROR HANDLER ***
app.use((error, req, res, next) => {
  return res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
  });
});

// *** EXPORT SERVER ***
module.exports = app;

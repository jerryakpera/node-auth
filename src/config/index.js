require('dotenv').config();

const ONE_HOUR = 1000 * 60 * 60;

const app = {
  port: process.env.PORT,
  inProduction: process.env.NODE_ENV === 'prod',
  bcryptWorkFactor: +process.env.BCRYPT_WORK_FACTOR,
  passwordLength: +process.env.PASSWORD_LENGTH,
  otpDuration: ONE_HOUR / 4,
};

const db = {
  dbURL: process.env.DB_URL,
};

const email = {
  emailService: process.env.EMAIL_SERVICE,
  emailAddress: process.env.EMAIL_ACCOUNT,
  emailPassword: process.env.EMAIL_PASSWORD,
  verificationText: `Welcome to ${process.env.APP_NAME}. Please click the link to verify your email address.`,
  verificationURL: `http://localhost:8080/ecommerce/account/verify`,
};

const session = {
  redisPort: +process.env.REDIS_PORT,
  redisHost: process.env.REDIS_HOST,
  redisPassword: process.env.REDIS_PASSWORD,
  sessionSecret: process.env.SESSION_SECRET,
  sessionIdleTimeout: ONE_HOUR / 2,
  sessionAbsoluteTimeout: ONE_HOUR * 6,
  sessionName: process.env.SESSION_NAME,
};

module.exports = {
  ...app,
  ...db,
  ...email,
  ...session,
};

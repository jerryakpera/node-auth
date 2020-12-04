const nodemailer = require('nodemailer');

const _config = require('../../config');
const _ = require('../../utils');
// EMAIL OPTIONS
const fromAddress = _config.emailAddress;
const emailPassword = _config.emailPassword;
const service = _config.emailService;

const transport = nodemailer.createTransport({
  host: service,
  port: 2525,
  auth: {
    user: fromAddress,
    pass: emailPassword,
  },
});

function sendVerification(userEmail, userID, code) {
  return new Promise((resolve, reject) => {
    const verificationMsg = _config.verificationText;

    const emailText =
      verificationMsg + `\n\n\n ${_config.verificationURL}/${userID}/${code}`;

    const mailOptions = _.getMailOptions(
      fromAddress,
      userEmail,
      'Verify your eCommerce account',
      emailText
    );

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info.response);
      }
    });
  });
}

module.exports = {
  sendVerification,
};

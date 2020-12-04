const OTP = require('../../lib/db/models/OTP');
const _ = require('../../utils');

async function createOTP(userEmail) {
  try {
    // Create new OTP
    const otp = OTP.create(_.createOTP(userEmail));

    return otp;
  } catch (err) {
    return err;
  }
}

module.exports = {
  createOTP,
};

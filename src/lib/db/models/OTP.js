const { Schema, model } = require('mongoose');

const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

const otpModel = model('otp', otpSchema);

module.exports = otpModel;

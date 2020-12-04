const { Schema, model } = require('mongoose');
const { hash, compare } = require('bcryptjs');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 12);
  }
});

const userModel = model('User', userSchema);

module.exports = userModel;

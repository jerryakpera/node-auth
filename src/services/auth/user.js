const User = require('../../lib/db/models/User');
const _ = require('../../utils');

async function register(email, firstname, lastname, phone, password) {
  // Check if user already exists
  const found = await User.exists({ email });
  if (found) throw _.error(400, 'Invalid email');

  // If no user then create new user
  const user = await User.create({
    email,
    firstname,
    lastname,
    phone,
    password,
  });

  return user;
}

async function verify(email, password) {
  //Find the user
  const user = await User.findOne({ email });

  // If no user or password not correct
  if (!user || !(await _.comparePasswords(password, user.password))) {
    throw _.error(401, 'Incorrect email or password');
  }

  return user;
}

module.exports = {
  register,
  verify,
};

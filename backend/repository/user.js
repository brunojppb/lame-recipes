const User = require('../models/user');

async function getByEmail(email) {
  return User.findOne({ where: { email } });
}

async function getById(id) {
  return User.findByPk(id);
}

async function userExists(email) {
  return getByEmail(email).then(u => u !== null)
}

async function createUser(name, email, hashedPassword, salt) {
  return User.create({
    name,
    email,
    hashedPassword,
    salt,
  });
}

const UserRepo = {
  getById,
  getByEmail,
  createUser,
  userExists,
};

module.exports = {
  UserRepo,
};

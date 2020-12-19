const User = require('../models/user');

function getByEmail(email) {
  return User.findOne({ where: { email } });
}

function getById(id) {
  return User.findByPk(id);
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
};

module.exports = {
  UserRepo,
};

const { Op } = require('sequelize');
const UserSession = require('../models/userSession');

function getByToken(token) {
  return UserSession.findOne({ where: { token } });
}

async function createSession(userId, token, expireAt) {
  return UserSession.create({
    token,
    expireAt,
    userId,
  });
}

async function getValidSession(token) {
  return UserSession.findOne({
    where: {
      token,
      expireAt: {
        [Op.gte]: new Date(),
      },
    },
  });
}

const UserSessionRepo = {
  getByToken,
  createSession,
  getValidSession,
};

module.exports = {
  UserSessionRepo,
};

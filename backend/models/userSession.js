const Sequelize = require('sequelize');
const { sequelize } = require('./index.js');

const UserSession = sequelize.define(
  'userSessions',
  {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,
    },
    token: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
    expireAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UserSession;

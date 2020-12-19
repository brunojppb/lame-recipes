const Sequelize = require('sequelize');
const { sequelize } = require('./index.js');

const UserSession = sequelize.define(
  'userSessions',
  {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    token: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    expireAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UserSession;

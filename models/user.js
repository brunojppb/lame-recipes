const Sequelize = require('sequelize');
const { sequelize } = require('./index.js');

const User = sequelize.define(
  'users',
  {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 255],
      },
    },
    hashedPassword: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;

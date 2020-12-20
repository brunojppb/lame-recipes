const Sequelize = require('sequelize');
const { sequelize } = require('./index.js');

const Recipe = sequelize.define(
  'recipes',
  {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 255],
      },
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

module.exports = Recipe;

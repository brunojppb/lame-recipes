const Sequelize = require('sequelize');
const { sequelize } = require('./index.js');
const File = require('./file');

const Recipe = sequelize.define(
  'recipes',
  {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 255],
      },
    },
    content: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
      default: ''
    },
    html: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
      default: ''
    },
    /** The number of people this recipe can serve */
    serving: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    prepTime: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    userId: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
    coverId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Recipe.belongsTo(File, {
  foreignKey: {
    name: 'coverId',
    allowNull: true,
  },
  as: 'cover',
  targetKey: 'id',
});

module.exports = Recipe;

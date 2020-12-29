const Sequelize = require('sequelize');
const { sequelize } = require('./index.js');

const File = sequelize.define(
  'files',
  {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
    },
    mimetype: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    extension: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
    url: {
      type: Sequelize.DataTypes.VIRTUAL,
      get() {
        return `/uploads/${this.id}.${this.extension}`;
      }
    }
  },
  {
    timestamps: true,
  }
);

module.exports = File;

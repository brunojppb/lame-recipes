import Sequelize from 'sequelize';
import { sequelize } from './index.js';

export const Recipe = sequelize.define('recipes', {
  id: {
    primaryKey: true,
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

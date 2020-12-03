import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export default function (sequelize, DataTypes) {
  const Recipe = sequlize.define(
    'recipes',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }
  )

  Recipe.associate = function (models) {
    
  }

  return Recipe
}
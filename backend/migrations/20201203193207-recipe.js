module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      console.log('Creating "recipes" table)');
      await queryInterface.createTable(
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
          },
          createdAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.NOW,
          },
          updatedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.NOW,
          },
        },
        {
          transaction,
        }
      );

      await transaction.commit();
    } catch (error) {
      console.error('Could not create "recipe" table:', error);
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      console.log('dropping "recipes" table');
      await queryInterface.dropTable('recipes', { transaction });
      await transaction.commit();
    } catch (error) {
      console.error('Could not drop "recipes" table', error);
      await transaction.rollback();
      throw error;
    }
  },
};
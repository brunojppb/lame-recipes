module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      console.log('Creating "users" table)');
      await queryInterface.createTable(
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
          },
          name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          hashedPassword: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          salt: {
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

      await queryInterface.addIndex('users', ['email'], {
        unique: true,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      console.error('Could not create "users" table:', error);
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      console.log('dropping "users" table');
      await queryInterface.dropTable('users', { transaction });
      await transaction.commit();
    } catch (error) {
      console.error('Could not drop "users" table', error);
      await transaction.rollback();
      throw error;
    }
  },
};

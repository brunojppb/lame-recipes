module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      console.log('Creating "userSessions" table)');
      await queryInterface.createTable(
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

      await queryInterface.addIndex('userSessions', ['token'], {
        unique: true,
        transaction,
      });

      await queryInterface.addConstraint('userSessions', {
        type: 'FOREIGN KEY',
        fields: ['userId'],
        references: {
          table: 'users',
          field: 'id',
        },
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      console.error('Could not create "userSessions" table:', error);
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      console.log('dropping "userSessions" table');
      await queryInterface.dropTable('userSessions', { transaction });
      await transaction.commit();
    } catch (error) {
      console.error('Could not drop "userSessions" table', error);
      await transaction.rollback();
      throw error;
    }
  },
};

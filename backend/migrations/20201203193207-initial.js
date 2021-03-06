module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Foreign key constraint enforcement for SQLite
      // See: https://www.sqlite.org/pragma.html
      await queryInterface.sequelize.query('PRAGMA foreign_keys = ON;');

      console.log('Creating "users" table)');
      await queryInterface.createTable(
        'users',
        {
          id: {
            primaryKey: true,
            type: Sequelize.DataTypes.BIGINT,
            autoIncrement: true,
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

      console.log('Creating "userSessions" table)');
      await queryInterface.createTable(
        'userSessions',
        {
          id: {
            primaryKey: true,
            type: Sequelize.DataTypes.BIGINT,
            autoIncrement: true,
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
            type: Sequelize.DataTypes.BIGINT,
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

      console.log('Creating "files" table)');
      await queryInterface.createTable(
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

      await queryInterface.addConstraint('files', {
        type: 'FOREIGN KEY',
        fields: ['userId'],
        references: {
          table: 'users',
          field: 'id',
        },
        transaction,
      });

      console.log('Creating "recipes" table)');
      await queryInterface.createTable(
        'recipes',
        {
          id: {
            primaryKey: true,
            type: Sequelize.DataTypes.BIGINT,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          content: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
          },
          html: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
          },
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

      await queryInterface.addConstraint('recipes', {
        type: 'FOREIGN KEY',
        fields: ['userId'],
        references: {
          table: 'users',
          field: 'id',
        },
        transaction,
      });

      await queryInterface.addConstraint('recipes', {
        type: 'FOREIGN KEY',
        fields: ['coverId'],
        references: {
          table: 'files',
          field: 'id',
        },
        transaction,
      });

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

      console.log('dropping "files" table');
      await queryInterface.dropTable('files', { transaction });

      console.log('dropping "userSessions" table');
      await queryInterface.dropTable('userSessions', { transaction });

      console.log('dropping "users" table');
      await queryInterface.dropTable('users', { transaction });

      await transaction.commit();
    } catch (error) {
      console.error('Could not drop "recipes" table', error);
      await transaction.rollback();
      throw error;
    }
  },
};

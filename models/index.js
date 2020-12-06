const { Sequelize } = require('sequelize');
const { rootPath } = require('../app');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `${rootPath}/recipes.${process.env.NODE_ENV}.sqlite3`,
});

async function setupDatabaseConn() {
  await sequelize.authenticate();
}

async function teardownDatabaseConn() {
  await sequelize.close();
}

module.exports = {
  sequelize,
  setupDatabaseConn,
  teardownDatabaseConn,
};

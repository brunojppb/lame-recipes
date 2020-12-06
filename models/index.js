const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db');

const sequelize = new Sequelize(dbConfig);

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

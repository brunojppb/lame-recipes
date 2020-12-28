const config = require('./index')
const dbFile = `db/recipes.${config.mode}.sqlite3`;
const logging = config.enableDBLogging && console.log;

module.exports = {
  dialect: 'sqlite',
  storage: dbFile,
  logging,
};

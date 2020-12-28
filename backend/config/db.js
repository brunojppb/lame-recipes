const dbFile = `db/recipes.${process.env.NODE_ENV || 'development'}.sqlite3`;

const logging = process.env.DB_LOGGING ? console.log : false

module.exports = {
  dialect: 'sqlite',
  storage: dbFile,
  logging,
};

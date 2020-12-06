const dbFile = `recipes.${process.env.NODE_ENV || 'development'}.sqlite3`;

module.exports = {
  dialect: 'sqlite',
  storage: dbFile,
};

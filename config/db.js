module.exports = {
  dialect: 'sqlite',
  storage: `recipes.${process.env.NODE_ENV}.sqlite3`,
};

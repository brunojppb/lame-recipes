import { dirname } from 'path';
import { Sequelize } from 'sequelize';

const rootPath = dirname('~/');

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `${rootPath}/recipes.${process.env.NODE_ENV}.sqlite3`,
});

export async function setupDatabaseConn() {
  await sequelize.authenticate();
}

export async function teardownDatabaseConn() {
  await sequelize.close();
}

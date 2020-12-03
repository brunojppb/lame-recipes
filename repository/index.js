import { Sequelize } from 'sequelize';
import * as path from 'path';

const rootPath = path.dirname(require.main.filename)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `${rootPath}/recipes.sqlite3`
})

export async function setupDatabaseConn() {
  await sequelize.authenticate();
  console.log('database connection established')
}

export async function teardownDatabaseConn() {
  await sequelize.close();
  console.log('database connection closed')
}

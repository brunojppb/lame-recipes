import { createConnection, getConnection } from 'typeorm';

export async function setupDatabaseConn(): Promise<void> {
  const conn = await createConnection();
}

export function shutdownDatabaseConn(): Promise<void> {
  const conn = getConnection();
  return conn.close();
}

import http from 'http';
import app from './app';
import { apolloServer } from './apolloServer';
import { createTerminus } from '@godaddy/terminus';
import { getConnection } from 'typeorm';
import { setupDatabaseConn } from './repository';

// Setup Apollo GraphQL endpoint
apolloServer.applyMiddleware({ app });

// cleanup resources on shutdown, like databases or file descriptors
function onSignal(): Promise<any> {
  console.log('server is starting to shutdown.');
  const conn = getConnection();
  conn.close();
  return Promise.resolve();
}

async function onHealthCheck(): Promise<any> {
  // checks if the system is healthy, like the db connection is live
  // resolves, if health, rejects if not
  return Promise.resolve('UP');
}

const server = http.createServer(app);

createTerminus(server, {
  signal: 'SIGINT',
  healthChecks: { '/healthcheck': onHealthCheck },
  onSignal
});

async function startServer(): Promise<void> {
  await setupDatabaseConn();
  const port: string = app.get('port');
  server.listen({ port }, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}

startServer();

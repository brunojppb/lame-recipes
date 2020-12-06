import http from 'http';
import terminus from '@godaddy/terminus';
import app from './app.js';
import apolloServer from './apolloServer.js';
import { setupDatabaseConn, teardownDatabaseConn } from './models/index.js';

// Setup Apollo GraphQL endpoint
apolloServer.applyMiddleware({ app });

// cleanup resources on shutdown, like databases or file descriptors
async function teardown() {
  await teardownDatabaseConn();
  return Promise.resolve();
}

async function onHealthCheck() {
  // checks if the system is healthy, like the db connection is live
  // resolves, if health, rejects if not
  return Promise.resolve('UP');
}

const server = http.createServer(app);

terminus.createTerminus(server, {
  signals: ['SIGINT', 'SIGTERM'],
  healthChecks: { '/healthcheck': onHealthCheck },
  onSignal: teardown,
});

async function startServer() {
  await setupDatabaseConn();
  const port = app.get('port');
  server.listen({ port }, () => {
    console.log(
      `🚀 Server running on port ${port} for env ${process.env.NODE_ENV}`
    );
  });
}

startServer();

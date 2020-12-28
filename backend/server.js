const http = require('http');
const { createTerminus } = require('@godaddy/terminus');
const { app } = require('./app.js');
const { apolloServer } = require('./apolloServer.js');
const config = require('./config')
const {
  setupDatabaseConn,
  teardownDatabaseConn,
} = require('./models/index.js');

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

createTerminus(server, {
  signals: ['SIGINT', 'SIGTERM'],
  healthChecks: { '/healthcheck': onHealthCheck },
  onSignal: teardown,
});

(async function startServer() {
  await setupDatabaseConn();
  server.listen({
    port: config.port
  },
    () => {
    console.log(
      `🚀 Server running on port ${config.port} for env ${config.mode}`
    );
  });
})()

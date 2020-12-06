const { resolve, join } = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const projectRootPath = resolve(__dirname);
const rootPath = projectRootPath;

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// on Production, we serve the build result from our React frontend
app.use(express.static(join(__dirname, '../frontend/build')));

module.exports = {
  app,
  rootPath,
};

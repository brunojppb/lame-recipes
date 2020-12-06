const { resolve } = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const projectRootPath = resolve(__dirname);
const rootPath = projectRootPath;

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

module.exports = {
  app,
  rootPath,
};

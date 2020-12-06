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

// I still want the homepage of our app to be very lean
// and served from the statics folder. no tricks there.
app.use(express.static('public'));

// on Production, we serve the build result from our React frontend
// and any static assset it contains
app.use(express.static(join(__dirname, '../frontend/build')));
// Any route after app mounts the React app
// react-router takes care of the rest
['/app', '/app/*'].forEach((route) => {
  app.use(
    route,
    express.static(join(__dirname, '../frontend/build/index.html'))
  );
});

module.exports = {
  app,
  rootPath,
};

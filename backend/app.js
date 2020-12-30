const { resolve, join } = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");

const projectRootPath = resolve(__dirname);
const rootPath = projectRootPath;

// Create Express server
const app = express();

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

// when running behind a reverse proxy like nginx
// the client’s IP address is understood as the left-most entry in the X-Forwarded-* header.
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

// rate-limit GraphQL calls
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100 // limit each IP to 200 requests per windowMs
});
app.use('/graphql', limiter);

// We still want the homepage of our app to be very lean
// and served from the static content folder. No tricks there.
app.use(express.static('public'));

// on Production, we serve the build result from our React frontend
// and any static asset it contains
app.use(express.static(join(__dirname, '../frontend/build')));

// Any route once the app mounts the React app
// react-router takes care of the rest
['/app', '/app/*'].forEach((route) => {
  app.use(
    route,
    express.static(join(__dirname, '../frontend/build/index.html'))
  );
});

app.use('/uploads', express.static('uploads'))

module.exports = {
  app,
  rootPath,
};

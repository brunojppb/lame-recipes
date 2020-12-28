require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  isHttpsActive: process.env.IS_HTTPS_ACTIVE === 'true',
  mode: process.env.NODE_ENV || 'development',
  enableDBLogging: process.env.ENABLE_DB_LOGGING === 'true',
};

module.exports = config;

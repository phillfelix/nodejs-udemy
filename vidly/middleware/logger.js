
const config = require('config');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const debug = require('debug')('app:logger');

function logger() {
  const env = config.util.getEnv('NODE_ENV');

  let logger;
  if(env === 'development') {
    logger = morgan('tiny');
    debug('Log enabled for all requests');
  } else {
    const accessLogStream = fs.createWriteStream(path.join(process.cwd(), 'logs', 'access.log'), { flags: 'a' });
    logger = morgan('combined', {
      stream: accessLogStream,
      skip: (req, res) => res.statusCode < 400
    });
    debug('Logging 4xx to file');
  }
  return logger;
}

module.exports = logger;

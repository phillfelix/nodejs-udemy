
const config = require('config');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

function logger() {
  const env = config.util.getEnv('NODE_ENV');

  let logger;
  if(env === 'development') {
    logger = morgan('tiny')
    console.log('Log enabled for all requests');
  } else {
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
    logger = morgan('combined', {
      stream: accessLogStream,
      skip: (req, res) => res.statusCode < 400
    });
    console.log('Logging 4xx to file');
  }
  return logger;
}

module.exports = logger;
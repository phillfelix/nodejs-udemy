const debug = require('debug')('app:auth');

function authenticate(req, res, next) {
  debug('Authenticating...');
  next();
}

module.exports = authenticate;
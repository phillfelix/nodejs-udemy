const config = require('config');
const express = require('express');
const helmet = require('helmet');
const debug = require('debug')('app:startup');
const genres = require('./routes/genres');
const home = require('./routes/home');
const auth = require('./middleware/auth');
const logger = require('./middleware/logger');
const app = express();

debug(`Application: ${config.get('name')}`);
debug(`Mail host: ${config.get('mail.host')}`);

app.set('view engine', 'pug');
app.set('views', './views'); // default

// third party middlewares
app.use(helmet());

// built in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// custom middlewares
app.use(logger());
app.use(auth);

// custom router
app.use('/', home);
app.use('/api/genres', genres);

const port = config.get('port'); // get port from environment
app.listen(port, () => debug(`'${config.get('name')}' listening on port ${port}`));
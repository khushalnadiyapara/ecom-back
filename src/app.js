const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const qs = require('qs');
const constant = require('@/config/constant');
const Logger = require('./service/logger');
const errorHandler = require('@/middleware/errorHandler');
const apiRoutes = require('@/routes/app.route');
const MarkdownServer = require('./lib/markdownServer');
const ServerError = require('./utils/serverError');

const app = express();

app.set('view engine', 'ejs');

app.use(morgan(':method :url Status : :status, Time taken: :response-time ms', {
  stream: {
    write: (message) => Logger.info(message),
  },
}));

app.use((req, res, next) => {
  const rawQuery = req.url.split('?')[1] || '';
  req.customQuery = qs.parse(rawQuery);
  next();
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => { res.send('pong'); });
app.use('/docs', MarkdownServer('docs'));
app.use('/files', express.static(constant.fileStoragePath));
app.use('/api', apiRoutes);
app.use('/througherr', (req, res, next) => {
  throw new ServerError(500, 'This is a test error');
});

app.use(errorHandler);

module.exports = app;

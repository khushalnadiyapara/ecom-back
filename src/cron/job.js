const cron = require('node-cron');
const Logger = require('../service/logger');
const flushGps = require('./jobs/flushPgs');
const flushAccounts = require('./jobs/flushAccounts');

// ┌────────────── second (optional)
// │ ┌──────────── minute
// │ │ ┌────────── hour
// │ │ │ ┌──────── day of month
// │ │ │ │ ┌────── month
// │ │ │ │ │ ┌──── day of week
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *

exports.flushPgCron = cron.schedule(
  '0 0 */2 * *',
  async () => {
    Logger.info('Flushing PGs...');
    await flushGps();
    Logger.info('PGs flushed');
  },
  { scheduled: false },
);

exports.flushAccountCron = cron.schedule(
  '0 1 */2 * *',
  async () => {
    Logger.info('Flushing Accounts...');
    await flushAccounts();
    Logger.info('Accounts flushed');
  },
  { scheduled: false },
);

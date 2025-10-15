const Database = require('../service/database');

/**
 *
 * @param {function} dal
 * @param  {...any} args
 */
async function callDal(dal, ...args) {
  const dbClient = await Database.pool.connect();
  try {
    return await dal(dbClient, ...args);
  } finally {
    dbClient.release();
  }
}

module.exports = callDal;

const Database = require('../service/database');

/**
 *
 * @param {function} dal
 * @returns {function}
 */
function mapServiceToDal(dal) {
  const service = async (...args) => {
    const dbClient = await Database.pool.connect();
    try {
      return await dal(dbClient, ...args);
    } finally {
      dbClient.release();
    }
  };

  return service;
}

module.exports = mapServiceToDal;

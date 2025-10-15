const Database = require('../../service/database');

exports.inquiry = async () => {
  const dbClient = await Database.pool.connect();
  try {
    const sqlQuery = `
        BEGIN;

        DELETE FROM "inquiry"
        WHERE "isDeleted" = true
        AND "deletedAt" < NOW() - INTERVAL '15 days';

        COMMIT;
      `;
    await dbClient.query(sqlQuery);
  } catch (err) {
    await dbClient.query('ROLLBACK');
    throw err;
  } finally {
    dbClient.release();
  }
};

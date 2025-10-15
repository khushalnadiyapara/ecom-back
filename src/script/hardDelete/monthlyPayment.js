const Database = require('../../service/database');

exports.guest = async () => {
  const dbClient = await Database.pool.connect();
  try {
    await dbClient.query('BEGIN');

    const sqlQuery = `
        DELETE FROM "monthlyPayment"
        WHERE "isDeleted"=true 
            AND "deletedAt" < NOW() - INTERVAL '15 days';
      `;
    await dbClient.query(sqlQuery);

    await dbClient.query('COMMIT');
  } catch (err) {
    await dbClient.query('ROLLBACK');
    throw err;
  } finally {
    dbClient.release();
  }
};

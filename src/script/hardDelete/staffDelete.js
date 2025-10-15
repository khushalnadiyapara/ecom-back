const Database = require('../../service/database');

exports.staff = async () => {
  const dbClient = await Database.pool.connect();
  try {
    await dbClient.query('BEGIN');

    await dbClient.query(`
        DELETE FROM "staffLightBillHistory"
        WHERE "isDeleted"=true 
            AND "deletedAt" < NOW() - INTERVAL '15 days';
      `);
    const sqlQuery = `
        BEGIN;

        DELETE FROM "staffLightBillHistory"
        USING "staff"
        WHERE "staffLightBillHistory"."staffId" = "staff"."id"
        AND "staff"."isDeleted" = true 
        AND "staff"."deletedAt" < NOW() - INTERVAL '15 days';

        DELETE FROM "staff"
        WHERE "isDeleted" = true
        AND "deletedAt" < NOW() - INTERVAL '15 days';

        COMMIT;
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

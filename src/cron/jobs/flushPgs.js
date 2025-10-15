/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const Database = require('../../service/database');
const Logger = require('../../service/logger');
const DeletePg = require('../../script/hardDelete/pg');

async function main() {
  const currentDate = new Date();
  const differenceInDays = 3;
  const lastDate = new Date(currentDate.setDate(currentDate.getDate() - differenceInDays));
  const dbClient = await Database.pool.connect();

  try {
    const pgs = (await dbClient.query(`
      select "id" from "pg"
      where
        ("isDeleted" = true and "deletedAt" is null) or
        ("isDeleted" = true and "deletedAt" <= $1) ;
      `, [lastDate])).rows.map((pg) => pg.id);

    Logger.info(`Deleting ${pgs.length} pgs...`);

    for (const pgId of pgs) {
      await DeletePg(dbClient, pgId);
    }

    Logger.info('Pgs deleted');
  } catch (err) {
    Logger.error(err.message, { stack: err.stack });
  } finally {
    dbClient.release();
    process.exit();
  }
}

module.exports = main;

/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const Database = require('../../service/database');
const Logger = require('../../service/logger');
const DeleteGuest = require('../../script/hardDelete/guest');

async function main() {
  const currentDate = new Date();
  const differenceInDays = 3;
  const lastDate = new Date(currentDate.setDate(currentDate.getDate() - differenceInDays));
  const dbClient = await Database.pool.connect();

  try {
    const guests = (await dbClient.query(`
      select "id" from "guest"
      where
        ("isDeleted" = true and "deletedAt" is null) or
        ("isDeleted" = true and "deletedAt" <= $1) ;
      `, [lastDate])).rows.map((pg) => pg.id);

    Logger.info(`Deleting ${guests.length} Guests...`);

    for (const gId of guests) {
      await DeleteGuest(dbClient, gId);
    }

    Logger.info('Guests deleted');
  } catch (err) {
    Logger.error(err.message, { stack: err.stack });
  } finally {
    dbClient.release();
    process.exit();
  }
}

module.exports = main;

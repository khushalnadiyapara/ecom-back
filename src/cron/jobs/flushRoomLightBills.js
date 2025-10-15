/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const Database = require('../../service/database');
const Logger = require('../../service/logger');
const DeleteRoomLightBill = require('../../script/hardDelete/roomLightBill');

async function main() {
  const currentDate = new Date();
  const differenceInDays = 3;
  const lastDate = new Date(currentDate.setDate(currentDate.getDate() - differenceInDays));
  const dbClient = await Database.pool.connect();

  try {
    const lightBills = (await dbClient.query(`
      select "id" from "roomLightBillHistory"
      where
        ("isDeleted" = true and "deletedAt" is null) or
        ("isDeleted" = true and "deletedAt" <= $1) ;
      `, [lastDate])).rows.map((pg) => pg.id);

    Logger.info(`Deleting ${lightBills.length} Room Light bill...`);

    for (const billId of lightBills) {
      await DeleteRoomLightBill(dbClient, billId);
    }

    Logger.info('Room Light bill deleted');
  } catch (err) {
    Logger.error(err.message, { stack: err.stack });
  } finally {
    dbClient.release();
    process.exit();
  }
}

main();

module.exports = main;

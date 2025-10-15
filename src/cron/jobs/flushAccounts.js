/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const Database = require('../../service/database');
const Logger = require('../../service/logger');
const DeleteAccount = require('../../script/hardDelete/account');

async function main() {
  const currentDate = new Date();
  const differenceInDays = 3;
  const lastDate = new Date(currentDate.setDate(currentDate.getDate() - differenceInDays));
  const dbClient = await Database.pool.connect();

  try {
    const accounts = (await dbClient.query(`
      select "id" from "account"
      where
        ("isDeleted" = true and "deletedAt" is null) or
        ("isDeleted" = true and "deletedAt" <= $1) ;
      `, [lastDate])).rows.map((ac) => ac.id);

    Logger.info(`Deleting ${accounts.length} Accounts...`);

    for (const accountId of accounts) {
      await DeleteAccount(dbClient, accountId);
    }

    Logger.info('Accounts deleted');
  } catch (err) {
    Logger.error(err.message, { stack: err.stack });
  } finally {
    dbClient.release();
    process.exit();
  }
}

module.exports = main;

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

const deletePg = require('./pg');

const hardDeleteAccount = async (dbClient, accountId) => {
  const { rows: pgs } = await dbClient.query('select "id" from "pg" where "accountId" = $1;', [accountId]);

  for (const { id } of pgs) {
    await deletePg(dbClient, id);
  }

  await dbClient.query('delete from "user" where "accountId" = $1;', [accountId]);
  await dbClient.query('delete from "account" where "id" = $1;', [accountId]);
};

module.exports = hardDeleteAccount;

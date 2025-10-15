const Database = require('../service/database');

const deleteAccount = require('./hardDelete/account');

async function main() {
  const dbClient = await Database.pool.connect();
  try {
    await dbClient.query('begin');
    console.log('Deleting account...');
    await deleteAccount(dbClient, 'acd082b2-7a46-438e-8ef2-45436aa01f9c');
    console.log('Account deleted');
    await dbClient.query('commit');
  } catch (error) {
    await dbClient.query('rollback');
    console.error(error);
  } finally {
    dbClient.release();
    process.exit();
  }
}

main();

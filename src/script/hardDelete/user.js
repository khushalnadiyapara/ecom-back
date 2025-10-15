/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

const userDelete = async (dbClient, userId) => {
  const tables = [
    'booking',
    'expense',
    'inquiry',
    'reminder',
    'room',
    'staff',
    'guest',
    'roomLightBillHistory',
    'monthlyPayment',
  ];

  for (const table of tables) {
    await dbClient.query(
      `
          UPDATE "${table}"
          SET
            "createdBy" = CASE WHEN "createdBy" = $1 THEN NULL ELSE "createdBy" END,
            "updatedBy" = CASE WHEN "updatedBy" = $1 THEN NULL ELSE "updatedBy" END,
            "deletedBy" = CASE WHEN "deletedBy" = $1 THEN NULL ELSE "deletedBy" END;
        `,
      [userId],
    );
  }

  await dbClient.query('DELETE FROM "userPgAccess" WHERE "userId" = $1;', [userId]);
  await dbClient.query('DELETE FROM "user" WHERE "id" = $1;', [userId]);
};

module.exports = userDelete;

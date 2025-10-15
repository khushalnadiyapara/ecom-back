/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const AWS = require('../../service/aws');

const deleteGuest = async (dbClient, guestId) => {
  await dbClient.query('DELETE FROM "monthlyPayment" WHERE "guestId" = $1;', [guestId]);

  const guestDocs = (await dbClient.query(`
    DELETE FROM "guestDocument"
    WHERE "guestId" = $1
    RETURNING "image";
  `, [guestId])).rows;

  const profiles = (await dbClient.query(`
    DELETE FROM "guest"
    WHERE "id" = $1
    RETURNING "profileImage" as "image";
  `, [guestId])).rows;

  const imagesToDelete = [...guestDocs, ...profiles].map((item) => item.image);

  for (const image of imagesToDelete) {
    await AWS.deleteFromS3(image);
  }
};

module.exports = deleteGuest;

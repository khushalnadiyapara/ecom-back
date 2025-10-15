/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const AWS = require('../../service/aws');

async function main(dbClient, roomLightBillHistoryId) {
  const history = (await dbClient.query(`
    DELETE FROM "roomLightBillHistory"
    WHERE "id" = $1
    RETURNING "image";
  `, [roomLightBillHistoryId])).rows;

  const imagesToDelete = history.map((item) => item.image);

  for (const image of imagesToDelete) {
    if (image) await AWS.deleteFromS3(image);
  }
}

module.exports = main;

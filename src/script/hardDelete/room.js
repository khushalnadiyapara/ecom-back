/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const AWS = require('../../service/aws');

const deleteRoom = async (dbClient, roomId) => {
  const history = (await dbClient.query(`
    DELETE FROM "roomLightBillHistory"
    WHERE "roomId" = $1
    RETURNING "image";
  `, [roomId])).rows;

  await dbClient.query('DELETE FROM "room" WHERE "id" = $1;', [roomId]);

  const imagesToDelete = history.map((item) => item.image);

  for (const image of imagesToDelete) {
    await AWS.deleteFromS3(image);
  }
};

module.exports = deleteRoom;

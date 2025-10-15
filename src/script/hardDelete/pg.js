/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const AWS = require('../../service/aws');

const hardDeletePg = async (dbClient, pgId) => {
  const { accountId } = (await dbClient.query('select "accountId" from "pg" where "id" = $1;', [pgId])).rows[0];

  if (!accountId) throw new Error('Account not found');

  const s3Keys = (await AWS.listObjects(`public/${accountId}/${pgId}/`)).Contents.map((item) => item.Key);

  for (const s3Key of s3Keys) {
    await AWS.deleteFromS3(s3Key);
  }

  const sqlQuery = [
    { query: 'delete from "staffDocument" where "pgId" = $1;', value: [pgId] },
    { query: 'delete from "staff" where "pgId" = $1;', value: [pgId] },
    { query: 'delete from "expense" where "pgId" = $1;', value: [pgId] },
    { query: 'delete from "booking" where "pgId" = $1;', value: [pgId] },
    { query: 'delete from "guestDocument" where "pgId" = $1;', value: [pgId] },
    { query: 'delete from "monthlyPayment" where "pgId" = $1;', value: [pgId] },
    { query: 'delete from "guest" where "pgId" = $1;', value: [pgId] },
    { query: 'delete from "roomLightBillHistory" where "pgId" = $1;', value: [pgId] },
    { query: 'delete from "room" where "pgId" = $1;', value: [pgId] },
    { query: 'delete from "inquiry" where "pgId" = $1;', value: [pgId] },
    { query: 'delete from "reminder" where "pgId" = $1;', value: [pgId] },
    { query: 'delete from "userPgAccess" where "pgId" = $1;', value: [pgId] },
    { query: 'delete from "pg" where "id" = $1;', value: [pgId] },
  ];

  for (const query of sqlQuery) {
    await dbClient.query(query.query, query.value);
  }
};

module.exports = hardDeletePg;

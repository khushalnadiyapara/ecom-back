/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-trailing-spaces */
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const AWS = require('../service/aws');
const Database = require('../service/database');

async function run() {
  try {
    const dbClient = await Database.pool.connect();

    const guestProfileQuery = `
      select
        g."pgId",
        g."id",
        g."profileImage" as "image",
        p."accountId"
      from "guest" g
      join "pg" p on g."pgId" = p."id"
      where g."profileImage" is not null;
    `;

    const billQuery = `
      select
        rlbh."pgId",
        rlbh."id",
        rlbh."image",
        p."accountId"
      from "roomLightBillHistory" rlbh
      join "pg" p on rlbh."pgId" = p."id"
      where rlbh."image" is not null;
    `;

    const docQuery = `
      select
        gd."pgId",
        gd."id",
        gd."image",
        p."accountId"
      from "guestDocument" gd
      join "pg" p on gd."pgId" = p."id"
      where gd."image" is not null;
    `;

    const staffDocQuery = `
      select
        sd."pgId",
        sd."id",
        sd."image",
        p."accountId"
      from "staffDocument" sd
      join "pg" p on sd."pgId" = p."id"
      where sd."image" is not null;
    `;

    const billResult = await dbClient.query(billQuery);
    const docResult = await dbClient.query(docQuery);
    const staffDocResult = await dbClient.query(staffDocQuery);
    const guestProfileResult = await dbClient.query(guestProfileQuery);

    const roomLightBills = billResult.rows;
    const guestDocuments = docResult.rows;
    const staffDocuments = staffDocResult.rows;
    const guestProfiles = guestProfileResult.rows;

    for (const roomLightBill of roomLightBills) {
      const soursPath = roomLightBill.image;
      const fileExtension = path.extname(soursPath).toLowerCase().slice(1);
      const isoString = new Date().toISOString();
      const validIsoStr = isoString.replace(/[:.]/g, '-');
      const destinationKey = `public/${roomLightBill.accountId}/${roomLightBill.pgId}/${uuidv4()}_${validIsoStr}_original.${fileExtension}`;

      try {
        await AWS.copyFileInS3(soursPath, destinationKey);
      } catch (err) {
        console.log('error');
      }
      const updateQuery = `
        update "roomLightBillHistory"
        set "image" = $1
        where "id" = $2
      `;
      await dbClient.query(updateQuery, [destinationKey, roomLightBill.id]);

      await AWS.deleteFromS3(soursPath);

      console.log(`Room light bill image deleted from ${soursPath}`);
    }

    for (const guestDocument of guestDocuments) {
      const soursPath = guestDocument.image;
      const fileExtension = path.extname(soursPath).toLowerCase().slice(1);
      const isoString = new Date().toISOString();
      const validIsoStr = isoString.replace(/[:.]/g, '-');
      const destinationKey = `public/${guestDocument.accountId}/${guestDocument.pgId}/${uuidv4()}_${validIsoStr}_original.${fileExtension}`;

      try {
        await AWS.copyFileInS3(soursPath, destinationKey);
      } catch (err) {
        console.log('error');
      }
      const updateQuery = `
        update "guestDocument"
        set "image" = $1
        where "id" = $2
      `;
      await dbClient.query(updateQuery, [destinationKey, guestDocument.id]);

      await AWS.deleteFromS3(soursPath);

      console.log(`Guest document image deleted from ${soursPath}`);
    }

    for (const staffDocument of staffDocuments) {
      const soursPath = staffDocument.image;
      const fileExtension = path.extname(soursPath).toLowerCase().slice(1);
      const isoString = new Date().toISOString();
      const validIsoStr = isoString.replace(/[:.]/g, '-');
      const destinationKey = `public/${staffDocument.accountId}/${staffDocument.pgId}/${uuidv4()}_${validIsoStr}_original.${fileExtension}`;

      try {
        await AWS.copyFileInS3(soursPath, destinationKey);
      } catch (err) {
        console.log('error');
      }
      const updateQuery = `
        update "staffDocument"
        set "image" = $1
        where "id" = $2
      `;
      await dbClient.query(updateQuery, [destinationKey, staffDocument.id]);

      await AWS.deleteFromS3(soursPath);

      console.log(`Staff document image deleted from ${soursPath}`);
    }

    for (const guestProfile of guestProfiles) {
      const soursPath = guestProfile.image;
      const fileExtension = path.extname(soursPath).toLowerCase().slice(1);
      const isoString = new Date().toISOString();
      const validIsoStr = isoString.replace(/[:.]/g, '-');
      const destinationKey = `public/${guestProfile.accountId}/${guestProfile.pgId}/${uuidv4()}_${validIsoStr}_original.${fileExtension}`;
      try {
        await AWS.copyFileInS3(soursPath, destinationKey);
      } catch (err) {
        console.log('error');
      }
      const updateQuery = `
        update "guest"
        set "profileImage" = $1
        where "id" = $2
      `;
      await dbClient.query(updateQuery, [destinationKey, guestProfile.id]);

      await AWS.deleteFromS3(soursPath);

      console.log(`Guest profile image deleted from ${soursPath}`);
    }

    dbClient.release();
    console.log('All images moved successfully');
  } catch (error) {
    console.error(error);
  }
}

run();

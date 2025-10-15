const { PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const deleteFromS3 = require('./deleteFromS3');
const Vars = require('../../config/var');
const { s3 } = require('./config');

/**
 * Upload file to S3
 */
const replaceFileInS3 = async (file, oldKey, newKey) => {
  try {
    const fileContent = fs.readFileSync(file.path);

    const command = new PutObjectCommand({
      Bucket: Vars.aws.s3.bucket,
      Key: newKey,
      Body: fileContent,
    });

    const orations = [s3.send(command)];
    if (oldKey) orations.push(deleteFromS3(oldKey));

    const [response] = await Promise.all(orations);

    return response;
  } finally {
    if (file && file.path) {
      fs.unlinkSync(file.path);
    }
  }
};

module.exports = replaceFileInS3;

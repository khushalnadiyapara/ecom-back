const { PutObjectCommand } = require('@aws-sdk/client-s3');

const fs = require('fs');
const Vars = require('../../config/var');
const { s3 } = require('./config');

/**
 * Upload file to S3
 */
const uploadFileToS3 = async (file, key) => {
  try {
    const fileContent = fs.readFileSync(file.path);

    const command = new PutObjectCommand({
      Bucket: Vars.aws.s3.bucket,
      Key: key,
      Body: fileContent,
    });
    const response = await s3.send(command);
    return response;
  } finally {
    if (file && file.path) {
      fs.unlinkSync(file.path);
    }
  }
};

module.exports = uploadFileToS3;

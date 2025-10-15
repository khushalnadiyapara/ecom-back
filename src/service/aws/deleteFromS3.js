const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const Vars = require('../../config/var');
const { s3 } = require('./config');

const deleteFromS3 = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: Vars.aws.s3.bucket,
    Key: key,
  });
  const response = await s3.send(command);
  return response;
};

module.exports = deleteFromS3;

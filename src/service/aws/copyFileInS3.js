const { CopyObjectCommand } = require('@aws-sdk/client-s3');
const Vars = require('../../config/var');
const { s3 } = require('./config');

const copyFileInS3 = async (sourceKey, destinationKey) => {
  const command = new CopyObjectCommand({
    Bucket: Vars.aws.s3.bucket,
    CopySource: `${Vars.aws.s3.bucket}/${sourceKey}`,
    Key: destinationKey,
  });
  const response = await s3.send(command);
  return response;
};

module.exports = copyFileInS3;

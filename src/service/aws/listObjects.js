const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { s3 } = require('./config');
const Vars = require('../../config/var');

async function listObject(path) {
  const command = new ListObjectsV2Command({
    Bucket: Vars.aws.s3.bucket,
    Prefix: path,
  });

  const response = await s3.send(command);
  return response;
}

module.exports = listObject;

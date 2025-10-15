// const AWS = require('aws-sdk');
const { S3Client } = require('@aws-sdk/client-s3');
const Vars = require('../../config/var');

const s3 = new S3Client({
  region: Vars.aws.region,
  accessKeyId: Vars.aws.accessKeyId,
  secretAccessKey: Vars.aws.secretAccessKey,
});

module.exports = { s3 };

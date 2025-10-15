const { s3 } = require('./config');
const uploadFileToS3 = require('./uploadFileToS3');
const deleteFromS3 = require('./deleteFromS3');
const copyFileInS3 = require('./copyFileInS3');
const Vars = require('../../config/var');
const replaceFileInS3 = require('./replaceFileInS3');
const listObjects = require('./listObjects');

function generateS3Url(s3Key) {
  if (!s3Key) return null;
  return `https://${Vars.aws.s3.bucket}.s3.${Vars.aws.region}.amazonaws.com/${s3Key}`;
}

module.exports = {
  s3,
  replaceFileInS3,
  uploadFileToS3,
  deleteFromS3,
  generateS3Url,
  copyFileInS3,
  listObjects,
};

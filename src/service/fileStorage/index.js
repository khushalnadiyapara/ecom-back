const fs = require('fs');
const path = require('path');
const constant = require('@/config/constant');
const ServerError = require('@/utils/serverError');

exports.upload = (filePath) => {
  const isFileExists = fs.existsSync(filePath);
  if (!isFileExists) throw new ServerError('NOT_FOUND', 'File not found');
  fs.renameSync(filePath, path.join(constant.fileStoragePath, path.basename(filePath)));
  return path.basename(filePath);
};

exports.saveFile = (fileName) => {
  if (typeof fileName !== 'string') throw new Error('File name must be a string');
  const existingFilePath = path.join(constant.tmpStoragePath, fileName);
  this.upload(existingFilePath);
  return fileName;
};

exports.delete = (fileName) => {
  if (typeof fileName !== 'string') throw new Error('File name must be a string');
  fs.unlinkSync(path.join(constant.fileStoragePath, fileName));
};

exports.handleUpdateFile = (oldFileName, newFileName) => {
  if (!newFileName) return null;
  if (oldFileName === newFileName) return newFileName;
  return this.saveFile(newFileName);
};

exports.handleNewFileSave = (newFileName) => {
  if (!newFileName) return null;
  return this.saveFile(newFileName);
};

exports.handleOldFileDelete = (oldFileName, newFileName) => {
  if (!oldFileName) return;
  if (oldFileName === newFileName) return;
  this.delete(oldFileName);
};

const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const constant = require('../../config/constant');

const uploadDirectory = constant.tmpStoragePath;

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase().slice(1);
    const UUID = uuidv4();
    cb(null, `${UUID}.${extension}`);
  },
});

module.exports = storage;

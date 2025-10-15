const multer = require('multer');
const path = require('path');
const storage = require('./storage');
const ServerError = require('../../utils/serverError');

const imageFileExtensions = ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'bmp', 'svg', 'ico', 'heif', 'heic'];

const fileFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).toLowerCase().slice(1);
  if (imageFileExtensions.includes(fileExtension)) cb(null, true);
  else cb(new ServerError('INVALID_DATA', 'Please upload a valid image file (jpg, jpeg, png, webp, etc.).'), false);
};

module.exports = fileFilter;

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5242880 }, // 5MB
});

module.exports = upload;

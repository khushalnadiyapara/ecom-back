const multer = require('multer');
const path = require('path');
const storage = require('./storage');
const ServerError = require('../../utils/serverError');

const validFileExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'webp', 'tiff', 'bmp', 'svg', 'ico', 'heif', 'heic'];

const fileFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).toLowerCase().slice(1);
  if (validFileExtensions.includes(fileExtension)) cb(null, true);
  else cb(new ServerError('INVALID_DATA', 'Please upload a valid File (pdf, doc, docx, xls, xlsx, ppt, pptx).'), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10485760 }, // 10MB
});

module.exports = upload;

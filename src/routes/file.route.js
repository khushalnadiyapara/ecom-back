const express = require('express');
const uploadFile = require('@/middleware/multer/fileUpload');

const fileUpload = require('@/components/files/uploadFile');

const router = express.Router();

router.route('/uploads')
  .post(uploadFile.single('file'), fileUpload.controller);

module.exports = router;

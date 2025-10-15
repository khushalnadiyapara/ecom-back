const express = require('express');

const fileRoutes = require('./file.route');
const whatsappRoutes = require('./whatsapp.route');

const router = express.Router();

router.use('/whatsapp', whatsappRoutes);
router.use('/files', fileRoutes);

module.exports = router;

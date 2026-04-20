const express = require('express');

const fileRoutes = require('./file.route');
const authRoutes = require('./auth.route');
const categoryRoutes = require('./category.route');
const subcategoryRoutes = require('./subcategory.route');
const productRoutes = require('./product.route');

const router = express.Router();

router.use('/files', fileRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/subcategories', subcategoryRoutes);
router.use('/products', productRoutes);

module.exports = router;

const express = require('express');
const { validate } = require('@/utils/validationHelper');
const withDatabase = require('@/utils/withDatabase');
const { privateRoute } = require('@/middleware/auth');

const createProduct = require('@/components/products/createProduct');
const listProducts = require('@/components/products/listProducts');
const updateProduct = require('@/components/products/updateProduct');
const deleteProduct = require('@/components/products/deleteProduct');

const router = express.Router();

router
  .route('/')
  .get(privateRoute, validate(listProducts.validationSchema), withDatabase(listProducts.controller))
  .post(privateRoute, validate(createProduct.validationSchema), withDatabase(createProduct.controller));

router
  .route('/:id')
  .put(privateRoute, validate(updateProduct.validationSchema), withDatabase(updateProduct.controller))
  .delete(privateRoute, validate(deleteProduct.validationSchema), withDatabase(deleteProduct.controller));

module.exports = router;

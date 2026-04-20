const express = require('express');
const { validate } = require('@/utils/validationHelper');
const withDatabase = require('@/utils/withDatabase');
const { privateRoute } = require('@/middleware/auth');

const createCategory = require('@/components/categories/createCategory');
const listCategories = require('@/components/categories/listCategories');
const updateCategory = require('@/components/categories/updateCategory');
const deleteCategory = require('@/components/categories/deleteCategory');

const router = express.Router();

router
  .route('/')
  .get(privateRoute, validate(listCategories.validationSchema), withDatabase(listCategories.controller))
  .post(privateRoute, validate(createCategory.validationSchema), withDatabase(createCategory.controller));

router
  .route('/:id')
  .put(privateRoute, validate(updateCategory.validationSchema), withDatabase(updateCategory.controller))
  .delete(privateRoute, validate(deleteCategory.validationSchema), withDatabase(deleteCategory.controller));

module.exports = router;


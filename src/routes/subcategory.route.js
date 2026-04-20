const express = require('express');
const { validate } = require('@/utils/validationHelper');
const withDatabase = require('@/utils/withDatabase');
const { privateRoute } = require('@/middleware/auth');

const createSubcategory = require('@/components/subcategories/createSubcategory');
const listSubcategories = require('@/components/subcategories/listSubcategories');
const updateSubcategory = require('@/components/subcategories/updateSubcategory');
const deleteSubcategory = require('@/components/subcategories/deleteSubcategory');

const router = express.Router();

router
  .route('/')
  .get(privateRoute, validate(listSubcategories.validationSchema), withDatabase(listSubcategories.controller))
  .post(privateRoute, validate(createSubcategory.validationSchema), withDatabase(createSubcategory.controller));

router
  .route('/:id')
  .put(privateRoute, validate(updateSubcategory.validationSchema), withDatabase(updateSubcategory.controller))
  .delete(privateRoute, validate(deleteSubcategory.validationSchema), withDatabase(deleteSubcategory.controller));

module.exports = router;


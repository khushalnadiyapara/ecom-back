const express = require('express');
const { validate } = require('@/utils/validationHelper');
const withDatabase = require('@/utils/withDatabase');

const createWhatsappClient = require('@/components/whatsapp/createWhatsappClient');
const listWhatsappClients = require('@/components/whatsapp/listWhatsappClients');
const deleteWhatsappClient = require('@/components/whatsapp/deleteWhatsappClient');
const activateWhatsappClient = require('@/components/whatsapp/activateWhatsappClient');
const updateWhatsappClient = require('@/components/whatsapp/updateWhatsappClient');

const router = express.Router();

router.route('/')
  .get(listWhatsappClients.controller)
  .post(validate(createWhatsappClient.validationSchema), createWhatsappClient.controller);

router.route('/:whatsapp_id')
  .put(validate(updateWhatsappClient.validationSchema), updateWhatsappClient.controller)
  .delete(validate(deleteWhatsappClient.validationSchema), withDatabase(deleteWhatsappClient.controller));

router.route('/:whatsapp_id/activate')
  .post(validate(activateWhatsappClient.validationSchema), activateWhatsappClient.controller);

module.exports = router;

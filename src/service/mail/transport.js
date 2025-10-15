const nodemailer = require('nodemailer');
const Var = require('../../config/var');

const transport = nodemailer.createTransport({
  host: Var.email.smtpHost,
  port: Var.email.smtpPort,
  secure: true,
  auth: {
    user: Var.email.id,
    pass: Var.email.password,
  },
});

module.exports = transport;

const nodemailer = require('nodemailer');
const Var = require('../../config/var');

const port = Number(Var.email.smtpPort) || 587;

const transport = nodemailer.createTransport({
  host: Var.email.smtpHost,
  port,
  secure: port === 465,
  auth: {
    user: Var.email.id,
    pass: Var.email.password,
  },
});

module.exports = transport;

const Transport = require('./transport');
const Vars = require('../../config/var');

exports.send = async (to, subject, html) => {
  const result = await Transport.sendMail({ from: Vars.email.id, to, subject, html });
  return result;
};

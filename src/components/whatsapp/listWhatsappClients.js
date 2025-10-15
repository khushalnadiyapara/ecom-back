const Whatsapp = require('@/service/whatsapp');

exports.controller = async (req, res, next) => {
  try {
    const clients = Whatsapp.listClients();
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

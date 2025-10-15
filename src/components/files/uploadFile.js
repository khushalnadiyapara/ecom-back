const ServerError = require('@/utils/serverError');

exports.controller = (req, res, next) => {
  const { file } = req;
  if (!file) throw new ServerError('INVALID_DATA', 'File is required');

  res.status(200).json({
    file: file.filename,
  });
};

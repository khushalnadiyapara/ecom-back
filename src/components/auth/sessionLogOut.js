const { Joi } = require('@/utils/validationHelper');
const Schema = require('@/config/validationSchema');
const jwt = require('@/utils/jwtToken');
const ServerError = require('@/utils/serverError');

exports.validationSchema = {
  body: Joi.object({
    session_id: Schema.uuid().required(),
    token: Schema.token().required(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { session_id, token } = req.body;

  const payload = jwt.decode(token);
  if (!payload || payload.type !== 'session_logout') {
    throw new ServerError('INVALID_DATA', 'Invalid token type');
  }

  const session = await db.queryOne(
    'SELECT id FROM sessions WHERE id = $1 AND user_id = $2 AND expires_at > NOW()',
    [session_id, payload.data.user_id],
  );

  if (!session) throw new ServerError('INVALID_DATA', 'Session not found or expired');

  await db.query('DELETE FROM sessions WHERE id = $1', [session_id]);
  await db.query('DELETE FROM tokens WHERE token = $1', [token]);

  return res.status(204).end();
};

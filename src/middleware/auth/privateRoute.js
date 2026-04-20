const Database = require('@/service/database');
const Token = require('@/utils/jwtToken');
const ServerError = require('@/utils/serverError');

const privateRoute = async (req, res, next) => {
  const token = req.headers.authorization || req.cookies.token;
  if (!token) throw new ServerError('UNAUTHORIZED', 'token is required');

  const payload = Token.decode(token);
  if (!payload || payload.type !== 'auth') {
    throw new ServerError('UNAUTHORIZED', 'invalid token');
  }

  const db = await Database.getConnection();
  try {
    const session = await db.queryOne(
      'SELECT * FROM sessions WHERE id = $1 AND expires_at > NOW()',
      [payload.data.session_id],
    );

    if (!session) throw new ServerError('UNAUTHORIZED', 'session expired');

    req.token = payload.data;
    req.user = {
      id: session.user_id,
      session_id: session.id,
      is_admin: Boolean(payload.data.is_admin),
      name: payload.data.name,
      phone_number: payload.data.phone_number,
      email: payload.data.email,
      permissions: payload.data.permissions || [],
    };

    return next();
  } finally {
    db.release();
  }
};

module.exports = privateRoute;

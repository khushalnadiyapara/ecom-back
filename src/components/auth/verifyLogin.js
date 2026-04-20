/**
 * OTP verification endpoint — NOT USED.
 * Direct login issues an access token in loginUser.js (see /OTP REMOVE.txt).
 * Route POST /auth/verify is commented out in auth.route.js.
 */

const { Joi } = require('@/utils/validationHelper');
const ServerError = require('@/utils/serverError');

exports.validationSchema = {
  body: Joi.object({
    token: Joi.string().required(),
    code: Joi.string().length(6).required(),
  }),
};

exports.controller = async () => {
  throw new ServerError(
    'INVALID_DATA',
    'OTP verification is disabled. Sign in with phone number and password only.',
  );
};

/* ——— Original OTP verify implementation (retained for reference only) ———
const jwt = require('@/utils/jwtToken');

exports.validationSchema = {
  body: Joi.object({
    token: Joi.string().required(),
    code: Joi.string().length(6).required(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { token, code } = req.body;

  const payload = jwt.decode(token);
  if (!payload || payload.type !== 'otp_verification') {
    throw new ServerError('INVALID_DATA', 'Invalid token');
  }

  const tokenData = await db.queryOne(
    'SELECT * FROM tokens WHERE token = $1 AND expires_at > NOW()',
    [token],
  );
  if (!tokenData) throw new ServerError('INVALID_DATA', 'Invalid or expired token');
  if (tokenData.code !== code) throw new ServerError('INVALID_DATA', 'Invalid verification code');

  const user = await db.queryOne('SELECT * FROM users WHERE id = $1', [payload.data.user_id]);
  if (!user) throw new ServerError('NOT_FOUND', 'User not found');

  const userPermissions = await db.queryAll(
    `
      SELECT p.name
      FROM users u
      JOIN role_permissions rp ON u.role_id = rp.role_id
      JOIN permissions p ON rp.permission_id = p.id
      WHERE u.id = $1
    `,
    [user.id],
  );

  const session = await db.queryOne(
    `
      INSERT INTO sessions (user_id, token, expires_at, ip_address, device_info, permissions)
      VALUES ($1, '', NOW() + INTERVAL '24 hours', $2, $3, $4)
      RETURNING *
    `,
    [
      user.id,
      req.ip,
      JSON.stringify({ user_agent: req.headers['user-agent'] || '' }),
      JSON.stringify(userPermissions),
    ],
  );

  const authToken = jwt.encode(
    {
      type: 'auth',
      data: {
        session_id: session.id,
        user_id: user.id,
        is_admin: Boolean(user.is_admin),
        name: user.name,
        phone_number: user.phone_number,
        email: user.email,
        permissions: userPermissions.map((p) => p.name),
      },
    },
    { expiresIn: 1000 * 60 * 60 * 24 },
  );

  await db.queryOne('UPDATE sessions SET token = $1 WHERE id = $2', [authToken, session.id]);
  await db.query('DELETE FROM tokens WHERE token = $1', [token]);

  return res.status(200).json({
    token_type: 'access',
    token: authToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      is_admin: Boolean(user.is_admin),
      permissions: userPermissions.map((p) => p.name),
    },
  });
};
*/

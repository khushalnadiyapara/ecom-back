const bcrypt = require('bcryptjs');
const { Joi } = require('@/utils/validationHelper');
const Schema = require('@/config/validationSchema');
const jwt = require('@/utils/jwtToken');
const ServerError = require('@/utils/serverError');

exports.validationSchema = {
  body: Joi.object({
    phone_number: Schema.phoneNumber().required(),
    password: Schema.password().required(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { phone_number, password } = req.body;

  const user = await db.queryOne(
    'SELECT * FROM users WHERE phone_number = $1',
    [phone_number],
  );

  if (!user) {
    throw new ServerError('INVALID_DATA', 'Either phone number or password is incorrect');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new ServerError('INVALID_DATA', 'Either phone number or password is incorrect');
  }

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

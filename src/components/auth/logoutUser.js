exports.controller = async (req, res, next, db) => {
  await db.queryOne(
    `
      UPDATE sessions
      SET expires_at = NOW(), updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id
    `,
    [req.user.session_id],
  );

  return res.status(204).end();
};

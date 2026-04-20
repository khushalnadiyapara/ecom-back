exports.controller = async (req, res, next, db) => {
  if (!req.user) return res.status(200).json({});
  if (req.user.is_admin) return res.status(200).json({ is_admin: 1 });

  const permissionsList = await db.queryAll(
    `
      SELECT p.name
      FROM users u
      JOIN role_permissions rp ON u.role_id = rp.role_id
      JOIN permissions p ON rp.permission_id = p.id
      WHERE u.id = $1
    `,
    [req.user.id],
  );

  const permissionsMap = {};
  permissionsList.forEach((p) => {
    permissionsMap[p.name] = 1;
  });

  return res.status(200).json(permissionsMap);
};

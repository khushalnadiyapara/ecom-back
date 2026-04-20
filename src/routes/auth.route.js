const express = require('express');
const { validate } = require('@/utils/validationHelper');
const withDatabase = require('@/utils/withDatabase');
const { privateRoute } = require('@/middleware/auth');

const loginUser = require('@/components/auth/loginUser');
// OTP /verify disabled — direct access token from POST /login (see OTP REMOVE.txt)
// const verifyLogin = require('@/components/auth/verifyLogin');
const logoutUser = require('@/components/auth/logoutUser');
const sessionLogOut = require('@/components/auth/sessionLogOut');
const getMyPermissions = require('@/components/auth/getMyPermissions');

const router = express.Router();

router.route('/login').post(validate(loginUser.validationSchema), withDatabase(loginUser.controller));
// router.route('/verify').post(validate(verifyLogin.validationSchema), withDatabase(verifyLogin.controller));
router.route('/logout').post(privateRoute, withDatabase(logoutUser.controller));
router.route('/session-logout').post(validate(sessionLogOut.validationSchema), withDatabase(sessionLogOut.controller));
router.route('/permissions').get(privateRoute, withDatabase(getMyPermissions.controller));

module.exports = router;

const router = require('express').Router();
// const { validate } = require('uuid');
const controller = require('../../controller/auth');
const { validate, verifyToken, verifyAuthToken } = require('../../middleware');
const schema = require('../../validation/auth');

router.post('/login', validate(schema.login), controller.login, controller.createSession);
router.post(`/admin-login`, validate(schema.admin_login), controller.isUserExist, controller.adminLogin, controller.createSession);
// router.post('/send-signup-otp', validate(schema.signupOtp), controller.isEmailExist, controller.isPhoneExist, controller.isRegNoExist, controller.sendOtp);
// router.post('/verify-signup-otp', verifyToken, validate(schema.verifyOtp), controller.verifyOtp);
// router.post('/signup', verifyToken, validate(schema.userSignup), controller.isEmailExist, controller.userSignup, controller.createSession);
// router.post('/forgot-password', validate(schema.forgot), controller.isUserExist, controller.sendOtp);
// router.patch('/reset-password', verifyToken, validate(schema.forResetPassword), controller.resetpassword);
// router.patch('/change-password', verifyAuthToken, validate(schema.changePassword), controller.changePassword)

module.exports = router
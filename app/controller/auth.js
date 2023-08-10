const response = require('../response/index');
const authJwt = require('../middleware')
const httpStatus = require('http-status')
const passwordHash = require('../utils/password');
const helper = require('../utils/helper');
const db = require('../models/index')
const commonService = require('../services/common');
const { Op } = require('sequelize');
const moment = require('moment')


exports.login = async (req, res, next) => {


  const dbTrans = await db.sequelize.transaction()

  try {
    const { email, device_id, device_token, device_type } = req.body;
    const { auth } = db.sequelize.models;

    let condition = { email };

    const checkUser = await commonService.findByCondition(auth, condition);
    if (!checkUser) {
      return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
    }
    const isLogin = passwordHash.comparePassword(req.body.password, checkUser.password);
    if (!isLogin) {
      return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
    }
    // check status if block than return 
    if (checkUser.status == '0') {
      return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
    }
    //following code for add limitation of maximum device id

    const totalLogin = await commonService.count(session, { auth_id: checkUser.id })
    if (totalLogin > (process.env.MAX_LOGIN_DEVICE * 1)) {
      await dbTrans.rollback()
      return response.error({req, res, msgCode: 'TOTAL_LOGIN' }, httpStatus.UNAUTHORIZED);
    } 
    const { password, is_phone_verified, is_email_verified, ...resultData } = checkUser;
    resultData.token = authJwt.generateAuthJwt({
      id: checkUser.id,
      user_type: checkUser.user_type,
      expires_in: process.env.TOKEN_EXPIRES_IN,
      email,
      device_id
    });
    console.log('result dat', resultData);


    resultData.createdAt = moment.utc(resultData.createdAt, null).tz('Asia/Kolkata').format('YYYY-MM-DD hh:mm:ss A')
    console.log('result dat', resultData.createdAt);

    if (!resultData.token) {
      return response.error({req, res, msgCode: 'INTERNAL_SERVER_ERROR' }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
    }
    // Passing login data to another middleware
    req.loginData = {
      dbTrans,
      device_details: { device_id, device_token, device_type },
      auth_details: resultData
    };
    return next();
  }
  catch (err) {
    console.log(err);
    return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
  }

};

exports.createSession = async (req, res) => {
  const { dbTrans } = req.loginData;
  try {
    const { device_id, device_token, device_type } = req.loginData.device_details;
    const condition = { device_id };
    const { session } = await db.sequelize.models;
    const checkSession = await commonService.findByCondition(session, condition)

    if (checkSession) {
      const condition = { id: checkSession.id };
      //for hard delete true is required to pass in delete query
      const destroySession = await commonService.deleteQuery(session, condition, dbTrans, true)
      if (!destroySession) {
        return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
      }
    }
    const sessionData = {
      auth_id: req.loginData.auth_details.id,
      device_id,
      device_token,
      device_type,
      jwt_token: req.loginData.auth_details.token
    };
    const createSession = await commonService.addDetail(session, sessionData, dbTrans)
    if (!createSession) {
      return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
    }

    const { ...data } = req.loginData.auth_details;

    let msgCode;
    if (req.url.slice(1) === 'signup') {
      msgCode = 'SIGNUP_SUCCESSFUL';
    }
    else {
      msgCode = req.t('LOGIN_SUCCESSFUL');
    }

    return response.success({req, res, msgCode, data }, httpStatus.OK, dbTrans);
  }
  catch (err) {
    // console.log('error are', err);
    return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);

  }
};



exports.sendOtp = async (req, res) => {
  const dbTrans = await db.sequelize.transaction()

  try {
    const { Otp } = db.sequelize.models;
    const { email } = req.body
    const otp = helper.generateOtp(process.env.OTP_DIGIT)
    const hashOtp = await passwordHash.generateHash(otp)
    const otpData = {
      id: helper.genUUID(),
      email,
      otp: hashOtp
    }
    const condition = { email }
    const token = authJwt.generateAuthJwt({
      email: email,
      expires_in: process.env.OTP_EXPIRES_IN
    });
    const checkOtp = await commonService.findByCondition(Otp, condition)
    if (checkOtp) {
      //if condition match than we update otp in existing row
      const updateData = await commonService.updateData(Otp, { otp: hashOtp }, condition, dbTrans)
      if (!updateData) {
        return response.error({req, res, msgCode: req.t('OTP_NOT_SEND') }, httpStatus.FORBIDDEN, dbTrans);
      }
      const msgCode = req.t('OTP_SENT')
      return response.success({req, res, msgCode, data: { token: token, OTP: otp } }, httpStatus.OK, dbTrans);
    }
    const createOtpDetails = await commonService.addDetail(Otp, otpData, dbTrans)
    if (!createOtpDetails) {
      return response.error({req, res, msgCode: req.t('OTP_NOT_SEND') }, httpStatus.FORBIDDEN, dbTrans);
    }
    const msgCode = 'OTP_SENT'
    return response.success({req, res, msgCode, data: { token: token, OTP: otp } }, httpStatus.OK, dbTrans);

  } catch (err) {
    return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);

  }
}

exports.verifyOtp = async (req, res, next) => {
  const dbTrans = await db.sequelize.transaction()
  try {
    const { Otp } = await db.sequelize.models;
    const { email, otp } = req.body
    const condition = { email }

    //get data from token
    const { ...tokenData } = req.token
    if (tokenData.email != email) {
      return response.error({req, res, msgCode: req.t('INVALID_TOKEN') }, httpStatus.UNAUTHORIZED, dbTrans);
    }
    const details = await commonService.findByCondition(Otp, condition)
    // console.log('details', details);

    if (!details) {
      return response.error({req, res, msgCode: req.t('OTP_EXPIRED') },httpStatus.UNAUTHORIZED, dbTrans);
    }
    const check = passwordHash.comparePassword(otp, details.otp)
    if (!check) {
      return response.error({req, res, msgCode: req.t('INVALID_OTP') }, httpStatus.UNAUTHORIZED, dbTrans);
    }
    const token = authJwt.generateAuthJwt({
      email: email,
      is_verified: true,
      expires_in: process.env.OTP_EXPIRES_IN
    });

    if (!token) {
      return response.error({ req, res, msgCode: req.t('EMAIL_v_FAILED') }, httpStatus.FORBIDDEN, dbTrans);
    }
    const deleteOtp = await commonService.deleteQuery(Otp, condition, dbTrans, true)
    if (!deleteOtp) {
      return response.error({req, res, msgCode: req.t('EMAIL_v_FAILED') }, httpStatus.FORBIDDEN, dbTrans);

    }

    // you can remove 242 to 248 according your requirement because i also use it in case of forgot- password

    if (req.headers["authorization"]) {
      req.verifyData = {
        email,
        dbTrans
      }
      return next()
    }
    const data = {
      Token: token
    }
    const msgCode = req.t('EMAIL_VERIFIED')
    return response.success({req, res, msgCode, data }, httpStatus.ACCEPTED, dbTrans);

  } catch (error) {
    console.log(error);
    return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);

  }
}

exports.resetpassword = async (req, res) => {
  const dbTrans = await db.sequelize.transaction()
  try {
    const { Auth } = await db.sequelize.models;
    const { new_password } = req.body;
    const { ...tokenData } = req.token
    if (!tokenData.is_verified) {
      return response.error({ req, res, msgCode: req.t('INVALID_TOKEN') }, httpStatus.UNAUTHORIZED, dbTrans);
    }
    const updateCondition = { email: tokenData.email };
    const hashPassword = await passwordHash.generateHash(new_password);

    const data = {
      password: hashPassword
    };
    const updateUser = await commonService.updateData(Auth, data, updateCondition)
    if (!updateUser) {
      return response.error({req, res, msgCode: req.t('UPDATE_ERROR') }, httpStatus.FORBIDDEN, dbTrans);
    }
    return response.success({req, res, msgCode: req.t('PASSWORD_UPDATED') }, httpStatus.CREATED, dbTrans);
  }
  catch (error) {
    return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);

  }

};

// this function is used for check email is exist or not if exist it returns already registered


exports.isEmailExist = async (req, res, next) => {
  try {
    const { Auth } = db.sequelize.models;

    const { email } = req.body;
    const condition = { email: email.toLowerCase() };
    const checkUserExist = await commonService.findByCondition(Auth, condition)
    if (!checkUserExist) {
      return next();
    }
    return response.error({req, res, msgCode: req.t('ALREADY_REGISTERED') }, httpStatus.CONFLICT);
  }
  catch (err) {
    return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

// this function is used for check phone no is exist or not if exist it returns already registered

exports.isPhoneExist = async (req, res, next) => {
  try {
    const { Auth } = db.sequelize.models;
    const { country_code, phone_no } = req.body
    const condition = { country_code, phone_no }
    const checkPhone = await commonService.findByCondition(Auth, condition)
    if (!checkPhone) { return next() }
    return response.error({req, res, msgCode: req.t('ALREADY_REGISTERED') }, httpStatus.CONFLICT);
  } catch (error) {
    return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR);

  }
}

// this function is used for check email is exist or not if not it return unauthorized

exports.isUserExist = async (req, res, next) => {
  try {
    const { Auth } = db.sequelize.models;
    const { email } = req.body;
    const condition = { email: email.toLowerCase() };
    const checkUserExist = await commonService.findByCondition(Auth, condition)
    if (!checkUserExist) {
      return response.error({req, res, msgCode: req.t('UNAUTHORIZED') }, httpStatus.UNAUTHORIZED);
    }
    return next();
  }
  catch (err) {
    return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR);

  }
};



exports.changePassword = async (req, res) => {
  const dbTrans = await db.sequelize.transaction()

  try {
    const { ...tokenData } = req.data
    // Below we require model
    const { Auth, Session } = db.sequelize.models;

    const { new_password, old_password, logout } = req.body
    const condition = { id: tokenData.id }
    const userDetails = await commonService.findByCondition(Auth, condition)
    if (!userDetails) {
      return response.error({req, res, msgCode: req.t('UPDATE_ERROR') }, httpStatus.FORBIDDEN, dbTrans);

    }
    // check old password is correct or not
    const check = passwordHash.comparePassword(old_password, userDetails.password)
    if (!check) {

      // await dbTrans.rollback();
      return response.error({req, res, msgCode: req.t('WRONG_PASS') }, httpStatus.UNAUTHORIZED, dbTrans);
    }
    const hashPassword = await passwordHash.generateHash(new_password);
    const data = {
      password: hashPassword
    };
    const updateUser = await commonService.updateData(Auth, data, condition)
    if (!updateUser) {
      // await dbTrans.rollback();
      return response.error({req, res, msgCode: req.t('UPDATE_ERROR') }, httpStatus.FORBIDDEN, dbTrans);
    }

    // if user want to logout all other device than pass logout true

    if (logout) {
      const sessionCondition = {
        [Op.and]: [{ auth_id: tokenData.id }, { device_id: { [Op.ne]: tokenData.device_id } }]
      }
      await commonService.deleteQuery(Session, sessionCondition, dbTrans, true)
    }

    // await dbTrans.commit();
    return response.success({req, res, msgCode: req.t('PASSWORD_UPDATED') }, httpStatus.OK, dbTrans);


  } catch (error) {
    return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);

  }
}

exports.logout = async (req, res) => {

  const dbTrans = await db.transaction(); // Creating database transaction
  try {
    // auth id we get from token
    const condition = {

      auth_id: req.data.id,
      device_id: req.query.device_id
    };
    const { session } = await db.sequelize.models;
    const destroySession = await commonService.deleteQuery(session, condition, dbTrans, true)
    if (!destroySession) {
      return response.error({req, res, msgCode: req.t('USER_NOT_FOUND') }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
    }
    return response.success({req, res, msgCode: req.t('LOGOUT_SUCCESSFUL'), data: null }, httpStatus.OK, dbTrans);
  }
  catch (err) {

    return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
  }
};


exports.adminLogin = async (req, res, next) => {
  const dbTrans = await db.sequelize.transaction();
  try {
    const { email, password, device_id, device_type, device_token } = req.body;

    const checkUser = req.userData;
    const validUser = passwordHash.comparePassword(password, checkUser.password);
    if (!validUser) {
      return response.error(req, res, { msgCode: 'WRONG_PASS' }, httpStatus.UNAUTHORIZED, dbTrans);
    }
    delete checkUser.password;
    const { ...result_data } = checkUser;

    const tokenObj = {
      auth_id: checkUser.id,
      user_type: checkUser.user_type,
      expires_in: env.TOKEN_EXPIRES_IN,
      email,
      device_id,
      user_role: checkUser.user_type,
      routeAccess: []
    };
    result_data.role = user_type.ADMIN;
    if (req.subAdminDetail) {
      tokenObj.user_role = req.subAdminDetail.created_by;
    }
    if (checkUser.user_type === user_type.SUB_ADMIN) {
      const findSubAdmin = req.subAdminDetail;
      const findSubAdminAcess = await commonService.getList(SubAdminPermission, { sub_admin_id: findSubAdmin.id });
      const subAdminControl = adminAccessControl(findSubAdminAcess?.rows);
      if (subAdminControl.length) {
        tokenObj.routeAccess = [...subAdminControl];
      }
    }

    result_data.token = authJwt.generateAuthJwt(tokenObj);

    req.loginData = {
      dbTrans,
      auth_details: result_data,
      device_details: { device_id, device_type, device_token }

    };
    if (!result_data.token) {
      return response.error(req, res, { msgCode: `INTERNAL_SERVER_ERROR` }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
    }
    return next();
  } catch (err) {
    console.log('🚀 ~ file: auth.js:386 ~ exports.adminLogin= ~ err:', err);
    return response.error(req, res, { msgCode: `INTERNAL_SERVER_ERROR` }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
  }
};
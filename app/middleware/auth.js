const jwt = require('jsonwebtoken')
const db = require('../models/index')
const response = require('../response/index')
const httpStatus = require('http-status')
const commonService = require('../services/common')

//This function is used for validate API key

exports.verifyApiKey = (req, res, next) => {
    try {
        let ApiKey = req.headers["x-api-key"];
        if (!ApiKey) {
            return response.error({req, res, msgCode: req.t('MISSING_API_KEY') }, httpStatus.UNAUTHORIZED);
        }
        console.log('api key', ApiKey);

        if (ApiKey != process.env.API_KEY) {
            return response.error({req, res, msgCode: req.t('INVALID_API_KEY') }, httpStatus.UNAUTHORIZED)

        }
        return next();
    } catch (error) {
        return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR)

    }
}



// This function is used for generate jwt token

exports.generateAuthJwt = (payload) => {

    const { expires_in, ...params } = payload;
    const token = jwt.sign(params, process.env.SECRET_KEY, { expiresIn: expires_in });
    if (!token) {
        return false;
    }
    return token;
};

exports.verifyAuthToken = (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if (!token) {
            return response.error({req, res, msgCode: req.t('MISSING_TOKEN') }, httpStatus.UNAUTHORIZED);
        }
        token = token.replace(/^Bearer\s+/, "")

        jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
            if (error) {
                return response.error({req, res, msgCode: req.t('TOKEN_EXPIRED') }, httpStatus.UNAUTHORIZED)
            }
            const { Session } = await db.sequelize.models;
            const condition = { jwt_token: token }
            const checkJwt = await commonService.getAuthDetail(Session, condition)
            if (!checkJwt) {
                return response.error({req, res, msgCode: req.t('INVALID_TOKEN') }, httpStatus.UNAUTHORIZED)
            }
            else {
                req.data = decoded;
                return next();
            }
        });
    }
    catch (err) {
        console.log(err);
        return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, res, httpStatus.INTERNAL_SERVER_ERROR)
    }
};

// function to verify user type you can change it  

exports.isCompany = (req, res, next) => {
    try {
        const jwtData = req.data;
        if (jwtData.user_type !== constant.user_type.COMPANY) {
            return response.success({req, res, msgCode: req.t('UNAUTHORIZED') }, httpStatus.UNAUTHORIZED);
        }
        else {
            req.data = jwtData;
            return next();
        }
    }
    catch (err) {
        return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') },  httpStatus.INTERNAL_SERVER_ERROR)

    }
};


exports.isAdmin = (req, res, next) => {
    try {
        // check role
        const jwtData = req.data;
        if (jwtData.user_type !== constant.user_type.ADMIN) {
            return response.success({req, res, msgCode: req.t('UNAUTHORIZED') }, httpStatus.UNAUTHORIZED);
        }
        else {
            req.data = jwtData;
            return next();
        }
    }
    catch (err) {
        return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR)

    }
};

exports.verifyToken = (req, res, next) => {
    try {
        let token = req.headers.token
        if (!token) {
            return response.error({req, res, msgCode: req.t('MISSING_TOKEN') }, httpStatus.UNAUTHORIZED);
        }
        jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
            console.log(error);
            if (error) {
                return response.error({req, res, msgCode: req.t('TOKEN_EXPIRED') }, httpStatus.UNAUTHORIZED)
            }
            req.token = decoded;
            return next();
        })
    } catch (err) {
        return response.error({req, res, msgCode: req.t('INTERNAL_SERVER_ERROR') }, httpStatus.INTERNAL_SERVER_ERROR)

    }
}

const router = require('express').Router();
// const { validate } = require('uuid');
const controller = require('../../controller/user');
const { validate, verifyToken, verifyAuthToken } = require('../../middleware');
const schema = require('../../validation/user');
const { routes } = require("../../constents/index")

router.post(`/${routes.USER.USER_BASIC_DETAIL}`,  controller.userBasicDetail);
router.post(`/${routes.USER.USER_DSP_DETAIL}`,  controller.userDspDetail);
router.post(`/${routes.USER.USER_SOC_DETAIL}`,  controller.userSocDetail);
module.exports= router;
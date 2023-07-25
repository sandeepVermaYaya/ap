
const response = require('../response/index');
const httpStatus = require('http-status');
const db = require('../models/index');
const {  } = db.sequelize.models;
const commonService = require('../services/common');
const { generateRandomPass } = require('../utils/password');
const { enum_data } = require('../constents/index');
const { Op, Sequelize } = require('sequelize');
const { generateHash } = require('../utils/password');
const helper = require('../utils/helper');
const moment = require('moment');

const basicDetail = async( req,res)=>{
    const dbTrans = await db.sequelize.transaction();
    
}
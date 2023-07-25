
const response = require('../response/index');
const httpStatus = require('http-status');
const db = require('../models/index');
const { auths: AUTH, reg_detail: REG_DETAIL } = db.sequelize.models;
const commonService = require('../services/common');
const { generateRandomPass } = require('../utils/password');
const { enum_data } = require('../constents/index');
const { Op, Sequelize } = require('sequelize');
const { generateHash } = require('../utils/password');
const helper = require('../utils/helper');
const moment = require('moment');
const multiparty = require('multiparty');
const {status}= require('../constents/index')


const userBasicDetail = async( req,res)=>{
    const dbTrans = await db.sequelize.transaction();
    try{
        const form = new multiparty.Form();
        let dataFields;
        form.parse(req, function(err, fields, files) {
            dataFields=fields;
            console.log("===========", dataFields.restrd_nm[0])
          });
        // let { reg_type[0], restrd_nm, ref_cd,public_reg_nm,category,cpp_id,pan_card,gstin,email_add,crrnt_addrs,rgstrd_addrs,whtsapp_nmbr,ph_number,poc_full_name,poc_dsgntn,poc_ph_nmbr,poc_email,poc_aadhar,poc_crrnt_addrs,agg_type,created_by } = dataFields;
        const condition= {
            email: dataFields.email_add[0]
        }
        const findUser= await commonService.findByCondition(AUTH,condition )
        if(findUser){
            return response.error(req, res, { msgCode: 'DEPARTMENT_ALREADY_EXIST' }, httpStatus.CONFLICT, dbTrans);
        }
        const authDataTosave= {
            email:dataFields.email_add[0],
            reg_type: dataFields.reg_type[0],
            is_email_verified: status.PENDING
        }
        const authData= commonService.addDetail(AUTH, authDataTosave, dbTrans);
        if(!authData){
            return response.error(req, res, { msgCode: 'INTERNAL_SERVER_ERROR' }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);

        }
        const objOTsave={
            restrd_nm:dataFields.restrd_nm[0],
              ref_cd:dataFields.ref_cd[0],
            //   public_reg_nm,
            //   category,
            //   cpp_id,
            //   pan_card,
            //   gstin,
            //   email_add,
            //   crrnt_addrs,
            //   rgstrd_addrs,
            //   whtsapp_nmbr,
            //   ph_number,
            //   poc_full_name,
            //   poc_dsgntn,
            //   poc_ph_nmbr,
            //   poc_email,
            //   poc_aadhar,
            //   poc_crrnt_addrs,
            //   agg_type,
            //   created_by,
            //   auth_id: authData.id
        }
        const userDetail= commonService.addDetail(REG_DETAIL, objOTsave, dbTrans);
        data = {authData, userDetail}
        return response.success(req, res, { msgCode, data }, httpStatus.OK, dbTrans);

    }catch(err){
        return response.error(req, res, { msgCode: 'INTERNAL_SERVER_ERROR' }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
    }
    
}

const userDspDetail= async(req,res)=>{
    const dbTrans = await db.sequelize.transaction();
    try{
        const form = new multiparty.Form();
        let dataFields;
        form.parse(req, function(err, fields, files) {
            dataFields=fields;
          });
        }
    catch(err){
        return response.error(req, res, { msgCode: 'INTERNAL_SERVER_ERROR' }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
    }
}

module.exports={
    userBasicDetail,
    userDspDetail
}
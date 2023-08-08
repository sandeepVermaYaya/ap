
const response = require('../response/index');
const httpStatus = require('http-status');
const db = require('../models/index');
const { auths: AUTH, reg_details: REG_DETAIL, reg_dsps: REG_DSP, reg_socs: REG_SOC } = db.sequelize.models;
const commonService = require('../services/common');
const { generateRandomPass } = require('../utils/password');
const { enum_data } = require('../constents/index');
const { Op, Sequelize } = require('sequelize');
const { generateHash } = require('../utils/password');
const helper = require('../utils/helper');
const moment = require('moment');
const multiparty = require('multiparty');
const {status}= require('../constents/index')
const {saveMUltipleImageInS3}= require('../utils/imageUpload');

const userBasicDetail = async( req,res)=>{
    const dbTrans = await db.sequelize.transaction();
    try{
        let { reg_type, restrd_nm, ref_cd,public_reg_nm,category,cpp_id,pan_card,gstin,email_add,crrnt_addrs,rgstrd_addrs,whtsapp_nmbr,ph_number,poc_full_name,poc_dsgntn,poc_ph_nmbr,poc_email,poc_aadhar,poc_crrnt_addrs,agg_type,created_by } =req.fields;
        const condition= {
            email: email_add
        }
        // const imgArray= [req.files].map((el) => Object.entries(el));
        // const image= await saveMUltipleImageInS3(imgArray[0])
        const findUser= await commonService.findByCondition(AUTH,condition )
        if(findUser){
            return response.error(req, res, { msgCode: 'EMAIL_ALREADY_EXISTS' }, httpStatus.CONFLICT, dbTrans);
        }

        const authDataTosave= {
            email:email_add,
            reg_type: reg_type,
            is_email_verified: false
        }
        const authData= await commonService.addDetail(AUTH, authDataTosave, dbTrans);
        if(!authData){
            return response.error(req, res, { msgCode: 'INTERNAL_SERVER_ERROR' }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);

        }
        const objOTsave={
            restrd_nm:restrd_nm,
              ref_cd:ref_cd,
              public_reg_nm,
              category,
              cpp_id,
              cpp_link : null,
              pan_card,
              pan_card_link: null ,
              gstin,
              crrnt_addrs,
              rgstrd_addrs,
              whtsapp_nmbr,
              ph_number,
              poc_full_name,
              poc_dsgntn,
              poc_ph_nmbr,
              poc_email,
              poc_aadhar,
              poc_crrnt_addrs: null,
              agg_type:[agg_type],
              created_by,
              auth_id: authData.id
        }
        const userDetail= await commonService.addDetail(REG_DETAIL, objOTsave, dbTrans);
        data = {authData, userDetail}
        return response.success(req, res, {msgCode: "BASIC_DETAL_ADDED", data }, httpStatus.OK, dbTrans);

    }catch(err){
        return response.error(req, res, { msgCode: 'INTERNAL_SERVER_ERROR' }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
    }
    
}

const userDspDetail= async(req,res)=>{
    const dbTrans = await db.sequelize.transaction();
    try{
        const { bulk_data}= req.files;
        let {...dsp_data} =req.fields;
        dsp_data=dsp_data
        const auth_id= dsp_data.auth_id
        if(bulk_data !== undefined){
            const iteration = ['ref_cd','public_reg_nm','artist_nm','apple', 'amazon_music','gaana', 'jiosaavn', 'spotify', 'wynk', 'yt_music', 'yt_channel'  ]
           dsp_data = await helper.fileReader(bulk_data,iteration);
            dsp_data.map(d=>{
                d.auth_id=auth_id;
            })

        }else{
            JSON.parse(dsp_data.data).map(d=>{
                d.auth_id=auth_id;
            })
        }
        const data= await commonService.addBulkData(REG_DSP, dsp_data,dbTrans);
        return response.success(req, res, {msgCode: "DSP_DETAL_ADDED", data }, httpStatus.OK, dbTrans);

    }
    catch(err){
        return response.error(req, res, { msgCode: 'INTERNAL_SERVER_ERROR' }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
    }
}
const userSocDetail= async(req,res)=>{
    const dbTrans = await db.sequelize.transaction();
    try{
        const { bulk_data}= req.files;
        let {...soc_data} = req.fields;
        soc_data=soc_data
        const auth_id= soc_data.auth_id

        if(bulk_data !== undefined){
            const iteration = ['ref_cd','public_reg_nm','accnt_typ','accnt_nm', 'instagram','facebook', 'linkedin', 'twitter', 'wikipedia']
            soc_data = await helper.fileReader(bulk_data,iteration);
            soc_data.map(d => {
                d.auth_id = auth_id;
            })
        }else{
            JSON.parse(soc_data.data).map(d=>{
                d.auth_id=auth_id;
            })
        }
        
        const data= await commonService.addDetail(REG_SOC, soc_data,dbTrans);
        return response.success(req, res, {msgCode: "SOCIAL_DETAL_ADDED", data }, httpStatus.OK, dbTrans);

    }
    catch(err){
        return response.error(req, res, { msgCode: 'INTERNAL_SERVER_ERROR' }, httpStatus.INTERNAL_SERVER_ERROR, dbTrans);
    }
}
module.exports={
    userBasicDetail,
    userDspDetail,
    userSocDetail
}

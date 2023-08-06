const Joi = require('joi');
const {enum_data}= require('../constents/index')
const userBasicDetails = Joi.object({
    reg_type: Joi.string().valid(enum_data.registration_type.AGGREGATOR,
        enum_data.registration_type.ARTIST,
        enum_data.registration_type.LABEL,
        enum_data.registration_type.SONG_WRITER) ,
    restrd_nm:Joi.string().required(),
    ref_cd:Joi.string().required(),
    public_reg_nm:Joi.string().required(),
    category:Joi.string().required().valid(
        enum_data.category.INDIVIDUAL,
        enum_data.category.COMPANY,
        enum_data.category.PROPRIETOR,
        enum_data.category.PARTNERSHIP),
    cpp_id:Joi.string().required(),
    pan_card:Joi.string().required(),
    gstin:Joi.string().required(),
    email_add:Joi.string().required(),
    crrnt_addrs:Joi.string().required(),
    rgstrd_addrs:Joi.string().required(),
    whtsapp_nmbr:Joi.string().required(),
    ph_number:Joi.string().required(),
    poc_full_name:Joi.string().required(),
    poc_dsgntn:Joi.string().required(),
    poc_ph_nmbr:Joi.string().required(),
    poc_email:Joi.string().required(),
    poc_aadhar:Joi.string().required(),
    poc_crrnt_addrs:Joi.string().required(),
    agg_type:Joi.string().required().valid(
        enum_data.agreement_type.MUSIC_PUBLISHING_AND_DISTRIBUTION,
        enum_data.agreement_type.CHANNEL_MANAGEMENT_SERVICE,
        enum_data.agreement_type.ARTIST_MANAGEMENT,
        enum_data.agreement_type.SONG_WRITER_MANAGEMENT),
    created_by:Joi.number().required(),
});

module.exports={
    userBasicDetails
}
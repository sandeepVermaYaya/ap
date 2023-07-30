'use strict';
const {
  Model
} = require('sequelize');
const {enum_data}=require("../constents/index")
module.exports = (sequelize, DataTypes) => {
  class reg_detail extends Model {
    static associate(models) {
      models.auths.hasMany(reg_detail, { foreignKey: 'auth_id', as: 'authId' });
      models.auths.hasMany(reg_detail, { foreignKey: 'created_by', as: 'createdBy' });
    }
  }
  reg_detail.init({
    restrd_nm: {
      type: DataTypes.STRING
    },
    ref_cd:
    {
      type: DataTypes.STRING
    },
    public_reg_nm:
    {
      type: DataTypes.STRING
    },
    category:
    {
      type: DataTypes.ENUM(
        enum_data.category.INDIVIDUAL,
        enum_data.category.COMPANY,
        enum_data.category.PROPRIETOR,
        enum_data.category.PARTNERSHIP
      )
    },
    cpp_id:
    {
      type: DataTypes.STRING
    },
    pan_card:
    {
      type: DataTypes.STRING
    },
    gstin:
    {
      type: DataTypes.STRING
    },
    crrnt_addrs:
    {
      type: DataTypes.STRING
    },
    rgstrd_addrs:
    {
      type: DataTypes.STRING
    },
    whtsapp_nmbr:
    {
      type: DataTypes.STRING
    },
    ph_number:
    {
      type: DataTypes.STRING
    },
    poc_full_name:
    {
      type: DataTypes.STRING
    },
    poc_dsgntn:
    {
      type: DataTypes.STRING
    },
    poc_ph_nmbr:
    {
      type: DataTypes.STRING
    },
    poc_email:
    {
      type: DataTypes.STRING
    },
    poc_aadhar:
    {
      type: DataTypes.STRING
    },
    poc_crrnt_addrs:
    {
      type: DataTypes.STRING
    },
    agg_type:
    {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  }, {
    sequelize,
    modelName: 'reg_details',
  });
  return reg_detail;
};
'use strict';
const {
  Model
} = require('sequelize');
const {enum_data}=require("../constents/index")

module.exports = (sequelize, DataTypes) => {
  class reg_soc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reg_soc.init({
    ref_cd:{
      type: DataTypes.STRING
    },
    public_reg_nm:{
      type: DataTypes.STRING
    },
    accnt_typ:{
      type: DataTypes.ENUM(
        enum_data.registration_type.AGGREGATOR,
        enum_data.registration_type.ARTIST,
        enum_data.registration_type.LABEL,
        enum_data.registration_type.SONG_WRITER
      )
    },
    accnt_nm:{
      type: DataTypes.STRING
    },
    instagram:{
      type: DataTypes.STRING
    },
    facebook:{
      type: DataTypes.STRING
    },
    linkedin:{
      type: DataTypes.STRING
    },
    twitter:{
      type: DataTypes.STRING
    },
    wikipedia:{
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'reg_soc',
  });
  return reg_soc;
};
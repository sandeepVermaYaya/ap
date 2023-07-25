'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reg_dsp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reg_dsp.init({
    ref_cd:
      {
        type: DataTypes.STRING
      },
      public_reg_nm:{
        type: DataTypes.STRING
      },
      artist_nm:{
        type: DataTypes.STRING
      },
      apple:{
        type: DataTypes.STRING
      },
      amazon_music:{
        type: DataTypes.STRING
      },
      gaana:{
        type: DataTypes.STRING
      },
      jiosaavn:{
        type: DataTypes.STRING
      },
      spotify:{
        type: DataTypes.STRING
      },
      wynk:{
        type: DataTypes.STRING
      },
      yt_music:{
        type: DataTypes.STRING
      },
      yt_channel:{
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {
    sequelize,
    modelName: 'reg_dsp',
  });
  return reg_dsp;
};
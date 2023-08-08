'use strict';
const {
  Model
} = require('sequelize');
const { status, dashboard_type, dashboard_status } = require('../constents');
module.exports = (sequelize, DataTypes) => {
  class reg_agg_main extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reg_agg_main.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ref_id: {
      type: DataTypes.INTEGER
    },
    agg_id: {
      type: DataTypes.INTEGER
    },
    ref_cd: {
      type: DataTypes.STRING
    },
    ref_cd:{
      type: DataTypes.STRING
    },
    music_dis_pub:{
      type: DataTypes.STRING
    },
    cms_agg:{
      type: DataTypes.STRING
    },
    swtr_mg:{
      type: DataTypes.STRING
    },
    artist_mg:{
      type: DataTypes.STRING
    },
    start_dt:{
      type: DataTypes.DATE
    },
    end_dt:{
      type: DataTypes.DATE
    },
    tenure:{
      type: DataTypes.STRING
    },
    tenure:{
      type: DataTypes.STRING
    },
    share:{
      type: DataTypes.DECIMAL
    },
    agg_status:{
      type: DataTypes.ENUM(
        status.COMPLETED,
        status.IN_PROGRESS, 
        status.HOLD,
        )
    },
    agg_admin_apprvl:{
      type: DataTypes.ENUM(
        status.APPROVED,
        status.IN_PROGRESS, 
        status.HOLD,
        )
    },
    admin_comments:{
      type: DataTypes.STRING
    },
    od_admin_apprvl:{
      type: DataTypes.ENUM(
        status.APPROVED,
        status.IN_PROGRESS, 
        status.HOLD,
        )
    },
    dashboard_type:{
      type: DataTypes.ENUM(
        dashboard_type.ADVANCE,
        dashboard_type.ARTIST_EXCLUSIVE, 
        dashboard_type.BASIC,
        dashboard_type.PRO,
        dashboard_type.SONGWRITER_EXCLUSIVE
        )
    },
    dashboard_status:{
      type: DataTypes.ENUM(
        dashboard_status.HOLD,
        dashboard_status.LOGGED_IN,
        dashboard_status.REQUESTED
        )
    },
  }, {
    sequelize,
    modelName: 'reg_agg_main',
  });
  return reg_agg_main;
};
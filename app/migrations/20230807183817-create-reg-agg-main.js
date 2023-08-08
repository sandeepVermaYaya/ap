'use strict';

const { status, dashboard_type, dashboard_status } = require("../constents");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reg_agg_mains', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ref_id: {
        type: Sequelize.INTEGER
      },
      agg_id: {
        type: Sequelize.INTEGER
      },
      ref_cd: {
        type: Sequelize.STRING
      },
      ref_cd:{
        type: Sequelize.STRING
      },
      music_dis_pub:{
        type: Sequelize.STRING
      },
      cms_agg:{
        type: Sequelize.STRING
      },
      swtr_mg:{
        type: Sequelize.STRING
      },
      artist_mg:{
        type: Sequelize.STRING
      },
      start_dt:{
        type: Sequelize.DATE
      },
      end_dt:{
        type: Sequelize.DATE
      },
      tenure:{
        type: Sequelize.STRING
      },
      tenure:{
        type: Sequelize.STRING
      },
      share:{
        type: Sequelize.DECIMAL
      },
      agg_status:{
        type: Sequelize.ENUM(
          status.COMPLETED,
          status.IN_PROGRESS, 
          status.HOLD,
          )
      },
      agg_admin_apprvl:{
        type: Sequelize.ENUM(
          status.APPROVED,
          status.IN_PROGRESS, 
          status.HOLD,
          )
      },
      admin_comments:{
        type: Sequelize.STRING
      },
      created_by:{
        type: Sequelize.INTEGER,
        references: {
          model: 'auths',
          key: 'id'
        },
      }, 
      modified_by:{
        type: Sequelize.INTEGER,
        references: {
          model: 'auths',
          key: 'id'
        },
      }, 
      od_admin_apprvl:{
        type: Sequelize.ENUM(
          status.APPROVED,
          status.IN_PROGRESS, 
          status.HOLD,
          )
      },
      dashboard_type:{
        type: Sequelize.ENUM(
          dashboard_type.ADVANCE,
          dashboard_type.ARTIST_EXCLUSIVE, 
          dashboard_type.BASIC,
          dashboard_type.PRO,
          dashboard_type.SONGWRITER_EXCLUSIVE
          )
      },
      dashboard_status:{
        type: Sequelize.ENUM(
          dashboard_status.HOLD,
          dashboard_status.LOGGED_IN,
          dashboard_status.REQUESTED
          )
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reg_agg_mains');
  }
};
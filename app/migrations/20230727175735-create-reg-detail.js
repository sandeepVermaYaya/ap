'use strict';
const {enum_data}=require("../constents/index")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reg_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      restrd_nm: {
        type: Sequelize.STRING
      },
      ref_cd:
      {
        type: Sequelize.STRING
      },
      public_reg_nm:
      {
        type: Sequelize.STRING
      },
      category:
      {
        type: Sequelize.ENUM(
          enum_data.category.INDIVIDUAL,
          enum_data.category.COMPANY,
          enum_data.category.PROPRIETOR,
          enum_data.category.PARTNERSHIP
        )
      },
      cpp_id:
      {
        type: Sequelize.STRING
      },
      cpp_image:{
        type: Sequelize.STRING
      },
      pan_card_no:
      {
        type: Sequelize.STRING
      },
      pan_card_image:
      {
        type: Sequelize.STRING
      },
      gstin:
      {
        type: Sequelize.STRING
      },
      crrnt_addrs:
      {
        type: Sequelize.STRING
      },
      rgstrd_addrs:
      {
        type: Sequelize.STRING
      },
      whtsapp_nmbr:
      {
        type: Sequelize.STRING
      },
      ph_number:
      {
        type: Sequelize.STRING
      },
      poc_full_name:
      {
        type: Sequelize.STRING
      },
      poc_dsgntn:
      {
        type: Sequelize.STRING
      },
      poc_ph_nmbr:
      {
        type: Sequelize.STRING
      },
      poc_email:
      {
        type: Sequelize.STRING
      },
      poc_aadhar:
      {
        type: Sequelize.STRING
      },
      poc_crrnt_addrs:
      {
        type: Sequelize.STRING
      },
      agg_type:
      {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      created_by:
      {
        type: Sequelize.INTEGER,
          references: {
            model: 'auths',
            key: 'id'
          },
      },
      auth_id:{ type: Sequelize.INTEGER,
          references: {
            model: 'auths',
            key: 'id'
          },
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
    await queryInterface.dropTable('reg_details');
  }
};
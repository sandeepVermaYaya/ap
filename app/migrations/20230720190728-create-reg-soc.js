'use strict';
const {enum_data}=require("../constents/index")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reg_socs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ref_cd:{
        type: Sequelize.STRING
      },
      public_reg_nm:{
        type: Sequelize.STRING
      },
      accnt_typ:{
        type: Sequelize.ENUM(
          enum_data.registration_type.AGGREGATOR,
          enum_data.registration_type.ARTIST,
          enum_data.registration_type.LABEL,
          enum_data.registration_type.SONG_WRITER
        )
      },
      accnt_nm:{
        type: Sequelize.STRING
      },
      instagram:{
        type: Sequelize.STRING
      },
      facebook:{
        type: Sequelize.STRING
      },
      linkedin:{
        type: Sequelize.STRING
      },
      twitter:{
        type: Sequelize.STRING
      },
      wikipedia:{
        type: Sequelize.STRING
      },
      created_by:{
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('reg_socs');
  }
};
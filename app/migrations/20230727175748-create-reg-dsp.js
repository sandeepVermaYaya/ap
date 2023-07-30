'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reg_dsps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ref_cd:
      {
        type: Sequelize.STRING
      },
      public_reg_nm:{
        type: Sequelize.STRING
      },
      artist_nm:{
        type: Sequelize.STRING
      },
      apple:{
        type: Sequelize.STRING
      },
      amazon_music:{
        type: Sequelize.STRING
      },
      gaana:{
        type: Sequelize.STRING
      },
      jiosaavn:{
        type: Sequelize.STRING
      },
      spotify:{
        type: Sequelize.STRING
      },
      wynk:{
        type: Sequelize.STRING
      },
      yt_music:{
        type: Sequelize.STRING
      },
      yt_channel:{
        type: Sequelize.STRING
      },
      created_by:{
        type:  Sequelize.INTEGER,
        references: {
          model: 'auths',
          key: 'id'
        },
      },
      auth_id:
      { type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('reg_dsps');
  }
};
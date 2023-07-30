const { v4: uuidv4 } = require('uuid');
const { enum_data } = require('../constents');
// const { sequelize } = require('../models');

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('auths', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER

      },
      reg_type: {
        type: Sequelize.ENUM(
          enum_data.registration_type.AGGREGATOR,
          enum_data.registration_type.ARTIST,
          enum_data.registration_type.LABEL,
          enum_data.registration_type.SONG_WRITER
        ),
        defaultValue: null
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      is_email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('auths');
  }
};
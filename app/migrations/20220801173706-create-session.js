'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.uuidv4
      },
      auth_id: {
        type: Sequelize.UUID,
        references: {
          model: "auths",
          key: "id"
        }

      },
      device_id: {
        type: Sequelize.STRING
      },
      device_token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      device_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jwt_token: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('sessions');
  }
};
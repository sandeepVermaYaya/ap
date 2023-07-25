'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('reg_details', 'auth_id', {
      type: Sequelize.UUID,
          references: {
            model: 'auths',
            key: 'id'
          },
    });
    await queryInterface.addColumn('reg_dsps', 'auth_id', {
      type: Sequelize.UUID,
          references: {
            model: 'auths',
            key: 'id'
          },
    });
    await queryInterface.addColumn('reg_socs', 'auth_id', {
      type: Sequelize.UUID,
          references: {
            model: 'auths',
            key: 'id'
          },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('reg_details', 'auth_id');
    await queryInterface.removeColumn('reg_dsps', 'auth_id');
    await queryInterface.removeColumn('reg_dsocs', 'auth_id');
  }
};

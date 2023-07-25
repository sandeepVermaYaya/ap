'use strict';
const {enum_data}=require("../constents/index")
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('auths', 'reg_type', {
      type: Sequelize.ENUM(
        enum_data.registration_type.AGGREGATOR,
        enum_data.registration_type.ARTIST,
        enum_data.registration_type.LABEL,
        enum_data.registration_type.SONG_WRITER
      ),
      defaultValue: null
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('auths', 'reg_type');
  }
};

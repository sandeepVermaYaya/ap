'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // session.belongsTo(models.auths, { foreignKey: "auth_id" });

    }
  }
  session.init({
    auth_id: DataTypes.UUID,
    device_id: DataTypes.STRING,
    device_token: DataTypes.STRING,
    device_type: DataTypes.STRING,
    jwt_token: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'session',
  });
  return session;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // auth.hasMany(models.sessions, { foreignKey: "auth_id" });

    }
  }
  auth.init({

    email: DataTypes.STRING,
    password: DataTypes.STRING,
    is_email_verified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'auth',
  });
  return auth;
};
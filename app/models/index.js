'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'production';
const config = require(__dirname + '/../config/config.js')[env];
console.log("🚀 ~ file: index.js ~ line 9 ~ config", config)
const db = {};

let sequelize;
console.log('--------------------', config)
if (process.env.NODE_ENV) {
  console.log('hiii');
  sequelize = new Sequelize(config);
} else {
  console.log('elses ');
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });



Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
console.log('hiii every one');

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error.message);
  })

sequelize.sync()
  .then(() => {
    console.log(`DB_NAME & tables created!`);
  }).catch((error) => {
    console.log("catchError>>>>>>>>", error)
  });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

const config = require('../config/config.json')['development'];


const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect
  }
);

module.exports = sequelize;
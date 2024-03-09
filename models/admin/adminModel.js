// const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelizeInstance');

const { Sequelize, DataTypes, Model } = require('sequelize');

const config = require('../../config/config.json')['development'];

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   {
//     host: config.host,
//     dialect: config.dialect
//   }
// );

class Admin extends Model { }

Admin.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  Model: "Admin",
  tableName: "admin"
})

module.exports = Admin;


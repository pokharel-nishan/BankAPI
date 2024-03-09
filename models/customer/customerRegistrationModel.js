const sequelize = require('../sequelizeInstance');

const { Sequelize, Model, DataTypes } = require('sequelize');

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

class Customer extends Model { }

Customer.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  contactno: {
    type: DataTypes.BIGINT,
    allowNull: false,
    // unique: true
  }
}, {
  sequelize,
  tableName: 'customer',
  modelName: 'Customer'
});

module.exports = Customer;

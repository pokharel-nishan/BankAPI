const { Sequelize, Model, DataTypes } = require('sequelize');
const config = require('../../config/config.json')['development'];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect
  }
);

class Account extends Model { }

Account.init({
  accountNo: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  totalBalance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'customer',
      key: 'email'
    }
  }
}, {
  sequelize,
  tableName: 'account',
  modelName: 'Account'
});

module.exports = Account;

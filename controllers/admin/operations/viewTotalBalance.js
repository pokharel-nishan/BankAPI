const Account = require('../../../models/customer/customerAccountModel');
const { Sequelize } = require('sequelize');


const viewTotalBalance = async (req, res) => {
  try {
    const availableBalance = await Account.findAll({ attributes: [[Sequelize.fn('SUM', Sequelize.col('totalBalance')), 'Available Balance']] })

    res.status(400).json(availableBalance);
  }
  catch (err) {
    return res.status(500).json({ err: `${err}` });
  }
}

module.exports = viewTotalBalance;
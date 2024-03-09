const Account = require('../../../models/customer/customerAccountModel');
const Customer = require('../../../models/customer/customerRegistrationModel')
const depositFunds = async (req, res) => {
  try {
    const { email, accountNo, amount, ...otherDetails } = req.body;

    if (!email || !accountNo || !amount) {
      return res.status(400).json({ "msg": "Insufficient information.", requiredParameters: "[email, accountNo, amount]" })
    }

    if (typeof email !== 'string' || typeof accountNo !== 'string' || typeof amount !== 'number' || amount <= 0) {
      return res.status(401).json({ msg: "Invalid value. Please enter correct value. " })
    }

    if (Object.keys(otherDetails).length > 0) {
      return res.status(400).json({ msg: "Invalid request", requiredParameters: "[email, accountNo, amount]" });
    }

    const verifyAccount = await Account.findOne({ where: { accountNo: accountNo } })

    if (!verifyAccount) {
      return res.status(400).json({ msg: "Provided account does not exist. Please try again. " })
    }

    // if (email === verifyAccount.email){
    //   return res.status(400).json({msg:"Email does not match the account owner."})
    // }

    const verifyCustomer = await Customer.findOne({ where: { email: email } })

    if (!verifyCustomer) {
      return res.status(401).json({ msg: "Email does not exist in the system. Please try again." })
    }

    const depositedFund = await Account.update({ totalBalance: verifyAccount.totalBalance + amount },
      { where: { accountNo: verifyAccount.accountNo } });

    const currentBalance = await Account.findOne({ attributes: ['totalBalance'], where: { accountNo: verifyAccount.accountNo } });

    const updatedAccountInfo = {
      depositor: verifyCustomer.email,
      account: verifyAccount.accountNo,
      previousBalance: verifyAccount.totalBalance,
      currentBalance: currentBalance.totalBalance
    }

    return res.status(201).json(updatedAccountInfo)

  }
  catch (err) {
    return res.status(500).json({ err: `${err}` });
  }
}

module.exports = depositFunds; 
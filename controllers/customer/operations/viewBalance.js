const Account = require('../../../models/customer/customerAccountModel')
const viewBalance = async (req, res) => {
  try {
    const { email, accountNo, ...otherDetails } = req.body;

    if (!email || !accountNo) {
      return res.status(400).json({ "msg": "Insufficient information.", requiredParameters: "[email, accountNo]" })
    }

    if (Object.keys(otherDetails).length > 0) {
      return res.status(400).json({ msg: "Invalid request", requiredParameters: "[email, accountNo]" });
    }

    const verifyAccount = await Account.findOne({ where: { accountNo: accountNo } })

    if (!verifyAccount) {
      return res.status(400).json({ msg: "Provided account does not exist. Please try again. " })
    }

    const verifyEmail = (verifyAccount.email === email);

    if (!verifyEmail) {
      return res.status(400).json({ msg: "Credentials do not match. Please try again." })
    }

    const AccountDetail = {
      account: verifyAccount.accountNo,
      email: verifyAccount.email,
      totalAmount: verifyAccount.totalBalance
    }

    res.status(200).json({ AccountDetail })
  }
  catch (err) {
    return res.status(500).json({ err: `${err}` });
  }

}

module.exports = viewBalance; 
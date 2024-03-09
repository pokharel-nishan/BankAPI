const Account = require('../../../models/customer/customerAccountModel');
const Customer = require('../../../models/customer/customerRegistrationModel');
const bcrypt = require('bcrypt')

const createAccount = async (req, res) => {
  try {
    const { email, password, ...otherFields } = req.body;

    if (Object.keys(otherFields).length > 0) {
      return res.status(400).json({ msg: "Invalid data. Only enter 'email' and 'password' for creating account." });
    }

    if (!email || !password) {
      return res.status(400).json({ msg: "Invalid request.", requiredParameters: "[email, password]" })
    }
    const verifiedEmail = await Customer.findOne({ where: { email: email } })

    if (!verifiedEmail) {
      return res.status(400).json({ msg: "Email is not valid." })
    }

    // const encryptedPassword = await Customer.findOne({ attributes: ['password'], where: { email: email } })
    const verifiedPassword = await bcrypt.compare(password, verifiedEmail.password);

    if (!verifiedPassword) {
      return res.status(400).json({ msg: "The password is incorrect. Please try again." })
    }

    const existingAccount = await Account.findOne({ where: { email: email } });

    if (existingAccount) {
      return res.status(401).json({ msg: "Account cannot be created. An account with the given email already exist within the system." })
    }

    const date = Date.now().toString();
    const username = verifiedEmail.username;

    const account = await Account.create({
      accountNo: date.concat(username),
      email: verifiedEmail.email
    })

    res.status(201).json({ account });
  }
  catch (err) {
    return res.status(500).json({ err: `${err}` });
  }
}

module.exports = createAccount; 
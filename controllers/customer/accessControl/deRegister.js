const Customer = require('../../../models/customer/customerRegistrationModel');
const bcrypt = require('bcrypt')
const deRegisterCustomer = async (req, res) => {
  try {
    const { email, password, ...otherFields } = req.body;

    if (Object.keys(otherFields).length > 0) {
      return res.status(400).json({ msg: "Invalid data. Only enter 'email' and 'password' for deregestering." });
    }

    const verifiedEmail = await Customer.findOne({ where: { email: email } })

    if (!verifiedEmail) {
      return res.status(400).json({ msg: "Invalid Email. Please try again." })
    }

    // const encryptedPassword = await Customer.findOne({ attributes: ['password'], where: { email: email } })
    const verifiedPassword = await bcrypt.compare(password, verifiedEmail.password);

    if (!verifiedPassword) {
      return res.status(400).json({ msg: "The password is incorrect. Please try again." })
    }

    const deregister = await Customer.destroy({ where: { email: verifiedEmail.email } });

    return res.status(200).json({ deregister })

  }
  catch (err) {
    return res.status(500).json({ err: `${err}` })
  }
}

module.exports = deRegisterCustomer;
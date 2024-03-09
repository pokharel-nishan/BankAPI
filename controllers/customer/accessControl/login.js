const Customer = require('../../../models/customer/customerRegistrationModel');
const bcrypt = require('bcrypt')


const customerLogin = async (req, res) => {
  try {
    const { email, password, ...otherFields } = req.body;

    if (Object.keys(otherFields).length > 0) {
      return res.status(400).json({ msg: "Invalid data. Only enter 'email' and 'password' for login" });
    }

    const verifiedEmail = await Customer.findOne({ where: { email: email } })

    if (!verifiedEmail) {
      return res.status(400).json({ msg: "Email is not registered into the system." })
    }

    // const encryptedPassword = await Customer.findOne({ attributes: ['password'], where: { email: email } })
    const verifiedPassword = await bcrypt.compare(password, verifiedEmail.password);

    if (!verifiedPassword) {
      return res.status(400).json({ msg: "The password is incorrect. Please try again." })
    }

    return res.status(201).json({ msg: 'Log in successful. Enjoy the service.' })

  }
  catch (err) {
    return res.status(404).json({ err: `${err}` })
  }
}

module.exports = customerLogin;
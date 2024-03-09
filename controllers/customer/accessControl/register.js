const Customer = require('../../../models/customer/customerRegistrationModel');
const bcrypt = require('bcrypt')

const registerCustomer = async (req, res) => {
  try {
    const { username, password, email, contactno, ...otherDetails } = req.body;

    if (Object.keys(otherDetails).length > 0) {
      return res.status(400).json({ msg: "Invalid request.", requiredParameters: "[username, password, email, contactno]" })
    }

    if (!username || !password || !email || !contactno) {
      return res.status(401).json({ msg: "Invalid request.", requiredParameters: "[username, password, email, contactno]" })
    }

    // checking the type of input values
    if (typeof username != 'string' || typeof password != 'string' || typeof email != 'string' || typeof contactno != 'number') {
      return res.status(401).json({ msg: "Invalid value. Please enter correct value. " })
    }

    // checm if email or contact number exists in the system
    const existingEmail = await Customer.findOne({ where: { email: email } })

    if (existingEmail) {
      return res.status(400).json({ msg: "Email already registered into the system " })
    }

    if (await Customer.findOne({ where: { contactno: contactno } })) {
      return res.status(400).json({ msg: "Contact Number already registered into the system " })
    }


    // const date = Date.now().toString();

    const encryptedPassword = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      // uniqueIdentifier: username.concat(date),
      username: username,
      password: encryptedPassword,
      email: email,
      contactno: contactno
    })

    return res.status(201).json(customer);
  }
  catch (err) {
    return res.status(500).json({ err: `${err}` })
  }
}

module.exports = registerCustomer;
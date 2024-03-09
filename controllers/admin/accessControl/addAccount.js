const Admin = require('../../../models/admin/adminModel');
const bcrypt = require('bcrypt')

const addAdminAccount = async (req, res) => {
  try {
    const { username, password } = req.body;

    // checking the type of input values
    if (typeof username != 'string' || typeof password != 'string') {
      return res.status(401).json({ msg: "Invalid value. Please enter correct value. " })
    }

    // const date = Date.now().toString();

    const encryptedPassword = await bcrypt.hash(password, 12);

    const admin = await Admin.create({
      // uniqueIdentifier: username.concat(date),
      username: username,
      password: encryptedPassword,
    })

    return res.status(201).json(admin);
  }
  catch (err) {
    return res.status(500).json({ err: `${err}` })
  }
}

module.exports = addAdminAccount;
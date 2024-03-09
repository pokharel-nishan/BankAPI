const Staff = require('../../../models/staff/staffModel')
const bcrypt = require('bcrypt')

const createStaffAccount = async (req, res) => {

  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ msg: "Insufficent values. Must enter 'username', 'password' and 'role'" })
    }
    // checking the type of input values
    if (typeof username != 'string' || typeof password != 'string' || typeof role != 'string') {
      return res.status(401).json({ msg: "Invalid value. Please enter correct value. " })
    }

    // check if username already exists into the system
    const verifyUsername = await Staff.findOne({ where: { username: username } })
    if (verifyUsername) {
      return res.status(400).json({ msg: "Staff with given username already exists. Please try another username. " })
    }

    const offeredRoles = ['manager', 'accountant', 'auditor']
    if (!offeredRoles.includes(role)) {
      return res.status(401).json({ msg: "Improper role assigned.", validRoles: "manager, accountant, auditor" })
    }

    const encryptedPassword = await bcrypt.hash(password, 12);

    const staff = await Staff.create({
      username: username,
      password: encryptedPassword,
      role: role
    })

    return res.status(201).json(staff);
  }
  catch (err) {
    return res.status(500).json({ err: `${err}` })
  }

}

module.exports = createStaffAccount;
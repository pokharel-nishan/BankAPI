const bcrypt = require('bcrypt');
const Admin = require('../../../models/admin/adminModel');

const adminLogin = async (req, res) => {
  try {
    const { username, password, ...otherDetails } = req.body;

    if (Object.keys(otherDetails).length > 0) {
      return res.status(400).json({ msg: "Invalid data. Only enter 'username' and 'password' for login" })
    }

    if (!username || !password) {
      return res.status(400).json({ msg: "Insufficient credentials. " })
    }

    const verifiedUser = await Admin.findOne({ where: { username: username } })

    if (!verifiedUser) {
      return res.status(400).json({ msg: "Invalid username or password." });
    }

    const verifiedPassword = await bcrypt.compare(password, verifiedUser.password)

    if (!verifiedPassword) {
      return res.status(400).json({ msg: "Invalid username or password." });
    }

    res.status(200).json({ msg: "Login successful. Enjoy the service." });

  }
  catch (err) {
    return res.status(500).json({ err: `${err}` })
  }
}
module.exports = adminLogin;
const Staff = require('../../../models/staff/staffModel')
const bcrypt = require('bcrypt')

const staffLogin = async (req, res) => {

  try {
    const { username, password, role, ...otherValues } = req.body;

    if (Object.keys(otherValues).length > 0) {
      return res.status(400).json({ msg: "Invalid values. Only enter 'username', 'password', and 'role' for login" });
    }

    if (!username || !password || !role) {
      return res.status(400).json({ msg: "Insufficent values.", requiredParameters: "'username', 'password' and 'role'" })
    }

    const verifiedStaffdetails = await Staff.findOne({ where: { username: username } });

    if (!verifiedStaffdetails) {
      return res.status(400).json({ msg: "Invalid credentials. Please try again." })
    }
    const verifiedPassword = await bcrypt.compare(password, verifiedStaffdetails.password);

    const verifiedRole = (verifiedStaffdetails.role == role);

    if (verifiedPassword && verifiedRole && verifiedStaffdetails) {
      return res.status(200).json({ msg: "Staff logged in successfully." })
    }
    else {
      return res.status(400).json({ msg: "Invalid credentials. Please try again. " })
    }
  }
  catch (err) {
    return res.status(500).json({ err: `${err}` })
  }

}

module.exports = staffLogin;
const Staff = require('../../../models/staff/staffModel');

const removeStaff = async (req, res) => {
  try {
    const { username, ...otherDetails } = req.body;

    if (Object.keys(otherDetails).length > 0) {
      return res.status(400).json({ msg: "Invalid request. Please enter 'username' only." })
    }

    // check if email exists into the system
    const verifyStaff = await Staff.findOne({ where: { username: username } });

    if (!verifyStaff) {
      return res.status(400).json({ msg: "Staff does not exist. Please verify the credentials and try again. " })
    }

    const removedStaff = await Staff.destroy({ where: { username: verifyStaff.username } });

    return res.status(200).json({ removedStaff });
  }
  catch (err) {
    return res.status(500).json({ err: `${err}` })
  }
}

module.exports = removeStaff;
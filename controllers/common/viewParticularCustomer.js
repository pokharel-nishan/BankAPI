const Customer = require('../../models/customer/customerRegistrationModel');


const viewParticularCustomer = async (req, res) => {
  try {
    const { email, ...otherDetails } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Invalid request. Please enter 'email' of the customer." })
    }
    if (Object.keys(otherDetails).length > 0) {
      return res.status(400).json({ msg: "Invalid request. Please enter 'email' only." })
    }

    // check if email exists into the system
    const verifyCustomer = await Customer.findOne({ where: { email: email } });

    if (!verifyCustomer) {
      return res.status(400).json({ msg: "Customer does not exist. Please verify the credentials and try again. " })
    }

    return res.status(200).json({ verifyCustomer });
  }
  catch (err) {
    return res.status(500).json({ err: `${err}` });
  }
}

module.exports = viewParticularCustomer;
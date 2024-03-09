const Customer = require('../../models/customer/customerRegistrationModel');

const viewAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();

    return res.status(200).json(customers)
  }
  catch (err) {
    return res.status(500).json({ err: `${err}` });
  }
}

module.exports = viewAllCustomers;
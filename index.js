const express = require('express');
const customerRouter = require('./routes/customerRoutes');
const adminRouter = require('./routes/adminRoutes');
const { sequelize: customerSequelize } = require('./models/customer/customerRegistrationModel');
const { sequelize: adminSequelize } = require('./models/admin/adminModel');
const { sequelize: staffSequelize } = require('./models/staff/staffModel');
const { sequelize: accountSequelize } = require('./models/customer/customerAccountModel')
const staffRouter = require('./routes/staffRoutes');
const sequelize = require('./models/sequelizeInstance')
const app = express();

const port = 3000;
app.use(express.json());


app.use('/customer', customerRouter); // for customers

app.use('/admin', adminRouter); // for admins

app.use('/staff', staffRouter); // for staff

app.listen(port, async () => {
  console.log(`Server is running in port: ${port}`)

  try {
    // await adminSequelize.authenticate();
    // console.log("Connection to admin established successfully.")
    // await customerSequelize.authenticate();
    // console.log("Connection to customer established successfully.")
    // await staffSequelize.authenticate();
    // console.log("Connection to staff established successfully.")
    // await accountSequelize.authenticate();
    // console.log("Connection to bank account established successfully.")

    // await adminSequelize.sync();
    // console.log("Admin table synced.")
    // await customerSequelize.sync();
    // console.log("Customer table synced.")
    // await staffSequelize.sync();
    // console.log("Staff table synced.")
    // await accountSequelize.sync();
    // console.log("Account table synced.")

    // await sequelize.sync({ force: true });
    await sequelize.sync();
  }
  catch (err) {
    console.log('Unable to connect to database: ', err);
  }
})
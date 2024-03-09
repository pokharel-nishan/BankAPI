const express = require('express');
const adminLogin = require('../controllers/admin/accessControl/login');
const createStaffAccount = require('../controllers/admin/operations/addStaff');
const removeStaff = require('../controllers/admin/operations/removeStaff');
const removeCustomer = require('../controllers/common/removeCustomer');
const viewCustomer = require('../controllers/common/viewParticularCustomer');
const viewAllCustomers = require('../controllers/common/viewAllCustomers');
const viewTotalBalance = require('../controllers/admin/operations/viewTotalBalance');

// const addAdminAccount = require('../controllers/admin/accessControl/addAccount');

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);

adminRouter.post('/addStaff', createStaffAccount);
// adminRouter.post('/register', addAdminAccount);

adminRouter.delete('/removestaff', removeStaff);

adminRouter.delete('/removecustomer', removeCustomer);

adminRouter.get('/viewcustomer', viewCustomer);

adminRouter.get('/customers', viewAllCustomers)

adminRouter.get('/availablebalance', viewTotalBalance)

module.exports = adminRouter;
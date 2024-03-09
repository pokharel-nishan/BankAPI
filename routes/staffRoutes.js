const express = require('express')
const staffRouter = express.Router();
const staffLogin = require('../controllers/staff/accessControl/login');
const removeCustomer = require('../controllers/common/removeCustomer');
const viewCustomer = require('../controllers/common/viewParticularCustomer');
const viewAllCustomers = require('../controllers/common/viewAllCustomers')

staffRouter.post('/login', staffLogin);

staffRouter.delete('/removecustomer', removeCustomer);

staffRouter.get('/viewcustomer', viewCustomer);

staffRouter.get('/customers', viewAllCustomers);

module.exports = staffRouter;
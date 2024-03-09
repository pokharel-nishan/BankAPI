const express = require('express');
const registerCustomer = require('../controllers/customer/accessControl/register');
const customerLogin = require('../controllers/customer/accessControl/login');
const deRegisterCustomer = require('../controllers/customer/accessControl/deRegister');
const createAccount = require('../controllers/customer/operations/createAccount');
const depositFunds = require('../controllers/customer/operations/depositFunds');
const viewBalance = require('../controllers/customer/operations/viewBalance');
const withdrawFunds = require('../controllers/customer/operations/withdrawFunds');
const deRegister = require('../controllers/customer/accessControl/deRegister')
const customerRouter = express.Router();

// app object pass -> define function, pass argument 
customerRouter.post('/register', registerCustomer);

customerRouter.post('/login', customerLogin);

customerRouter.delete('/deregister', deRegisterCustomer);

customerRouter.post('/createAccount', createAccount);

customerRouter.patch('/deposit', depositFunds);

customerRouter.get('/viewbalance', viewBalance);

customerRouter.patch('/withdraw', withdrawFunds);


module.exports = customerRouter;
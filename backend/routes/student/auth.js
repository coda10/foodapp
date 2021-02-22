//Import Router package
const router = require('express').Router();

//Importing Student Controller Module Module
const studentController = require('../../controller/studentAuthController');


//===================================================================================================================//
//                                      {Register Endpoint}
//===================================================================================================================//
router.post('/register', studentController.studentRegistration);

//===================================================================================================================//
//                                      {Login Endpoint}
//===================================================================================================================//
router.post('/login', studentController.studentLogin);


//===================================================================================================================//
//                                      {Reset Password Endpoint}
//===================================================================================================================//
router.post('/reset-password', studentController.resetPassword);

//Router
module.exports = router;
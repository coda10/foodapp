//Import Router package
const router = require('express').Router();

//Import token Function module
const authController = require('../../controller/adminAuthController');

// //Test Auth 
// router.get('/authtest', (req, res)=>{
//     res.send({message: "Auth works well"});
// })

//===================================================================================================================//
//                                      {Login Up Endpoint}
//===================================================================================================================//
router.post('/login',  authController.login);

//===================================================================================================================//
//                                      {Reset Password Endpoint}
//===================================================================================================================//
router.post('/reset-password', authController.resetPassword);

//===================================================================================================================//
//                                      {Create Admin Endpoint}
//===================================================================================================================//
router.post('/createadmin', authController.createAdmin);


module.exports = router;
//Import Router package
const router = require('express').Router();

//Import Student Dashboard Controller
const studentDashboardController = require('../../controller/studentDashboardController');

//Import token Function module
const auth = require('../../helperFunctions/tokenFunction');


//===================================================================================================================//
//                                      {View menu of the week Endpoint}
//===================================================================================================================//
router.get('/weekmenu', auth.verifyToken, studentDashboardController.weekMenu);

//===================================================================================================================//
//                                      {View My orders Endpoint}
//===================================================================================================================//
router.post('/myorders', auth.verifyToken, studentDashboardController.myOrders);

//===================================================================================================================//
//                                      {Place orders Endpoint}
//===================================================================================================================//
router.post('/placeorders', auth.verifyToken, studentDashboardController.placeOrders);

//===================================================================================================================//
//                                      {Update orders Endpoint}
//===================================================================================================================//
router.post('/updateorders', auth.verifyToken, studentDashboardController.updateOrders);

//===================================================================================================================//
//                                      {Cancel all orders Endpoint}
//===================================================================================================================//
router.patch('/cancelallorders', auth.verifyToken, studentDashboardController.cancelAllOrders);

//Router
module.exports = router;
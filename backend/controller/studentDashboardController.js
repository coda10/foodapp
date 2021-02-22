//Import Menu Model
const { findOneAndUpdate } = require('../model/MenuModel');
const Menu = require('../model/MenuModel');

//Import Student Module
const Students = require('../model/StudentsModel');


//===================================================================================================================//
//                                      {View menu of the week Endpoint}
//===================================================================================================================//
const weekMenu = async (req, res)=>{
                try {
                    const fetchWeekMenu = await Menu.find();
                    res.send({fetchWeekMenu});
                } catch (error) {
                    res.status(404).send({error: error.message});
                }
};

//===================================================================================================================//
//                                      {My Order Endpoint}
//===================================================================================================================//
const myOrders = async (req, res)=>{
                //Check if placeOrders object is not empty
                if(!req.body) return res.status(404).send({error: "Object body is empty"});

                try {
                    const order = req.body;
                    const fetchOrders = await Students.find({id: order.id}, {orders_for_current_week: 1});
                    res.send({Orders: fetchOrders});
                } catch (error) {
                    res.status(404).send({error: error.message});
                }
};

//===================================================================================================================//
//                                      {Place orders Endpoint}
//===================================================================================================================//
const placeOrders = async (req,res)=>{
                //Check if placeOrders object is not empty
                if(!req.body) return res.status(404).send({error: "Object body is empty"});

                try {
                    //Validate
                    const ordersObj = req.body.orders;

                    const checkId = await Students.find({id: ordersObj.id});

                    if(checkId.length <= 0) return res.send({error: "User does not exist"});

                    //Create Orders
                    const createOrder = await Students.findOneAndUpdate({id: ordersObj.id}, {$set: {orders_for_current_week: ordersObj.menu}});

                    if(!createOrder) return res.send({error: "Order creation failed!"});

                    res.send({message: "Order Creation Successful!"});
                } catch (error) {
                    res.status(404).send({error: error.message});
                }
};

//===================================================================================================================//
//                                      {Update orders Endpoint}
//===================================================================================================================//
const updateOrders = async (req,res)=>{
                //Check if updateOrders object is not empty
                if(!req.body) return res.status(404).send({message: "Object body is empty"});

                try {
                    //Validate
                    const ordersObj = req.body.orders;

                    //Update Orders
                    const updateOrder = await Students.findOneAndUpdate({id: ordersObj.id}, {$set: {orders_for_current_week: ordersObj.menu}});

                    if(!updateOrder) return res.send({error: "OrderS Update failed!"});

                    res.send({message: "Orders Update Successful!"});
                } catch (error) {
                    res.status(404).send({error: error.message});
                }
            };

//===================================================================================================================//
//                                      {Cancel all orders Endpoint}
//===================================================================================================================//
const cancelAllOrders = async (req,res)=>{
                //Check if cancelAllOrders object is not empty
                if(!req.body) return res.status(404).send({message: "Object body is empty"});

                try {
                    //Validate
                    const ordersObj = req.body.orders;

                    //Delete Orders
                    const deleteOrder = await Students.findOneAndUpdate({id: ordersObj.id}, {$set: {orders_for_current_week: ordersObj.menu}});

                    if(!deleteOrder) return res.send({error: "Orders delete failed!"});

                    res.send({message: "Orders delete Successful!"});
                } catch (error) {
                    res.status(404).send({error: error.message});
                }
};


//Export Functions
module.exports = {
    weekMenu, myOrders, placeOrders, updateOrders, cancelAllOrders
};
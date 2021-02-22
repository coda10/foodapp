//Importing Student Module
const Students = require('../model/StudentsModel');

//Import Token Funtion
const auth = require('../helperFunctions/tokenFunction');


//===================================================================================================================//
//                                      {Register Endpoint}
//===================================================================================================================//
const studentRegistration =  async (req, res)=>{
                        //Check if register object is not empty
                        if(!req.body) return res.status(404).send({message: "Object body is empty"});

                        try {
                            //Validate

                            const loginObj = req.body;

                            const regista = await Students.findOneAndUpdate({id: req.body.id}, {$set: {username: loginObj.username, password: loginObj.password}});

                            if(!regista) return res.send({error: "User does not exist"});

                            res.send({message: "Registration Successful!"});
                        } catch (error) {
                            res.status(404).send({error: error.message});
                        }
                    };

//===================================================================================================================//
//                                      {Reset Password Endpoint}
//===================================================================================================================//
const studentLogin = async (req, res)=>{
                    //Check if login object is not empty
                    if(!req.body) return res.status(404).send({message: "Object body is empty"});
                                    
                    try {
                        //Validate
                        const username = req.body.username;
                        const password = req.body.password;
                        
                        //Check if Email exist
                        const usernameExist  = await Students.find({username});
                        
                        if(usernameExist.length <= 0) return res.send({error: "Username does not exist"});
                        if(usernameExist[0].password !== password) return res.send({error: "Invalid Password!"});
                        
                        if(username === usernameExist[0].username && password === usernameExist[0].password){
                            //Generate token
                            const token = auth.generateToken({username: usernameExist.username}, "1h");
                            
                            //Return Data and Token
                            res.send({username: usernameExist[0].username, token});
                        }else{
                            res.send({error: "Failed to login!"});
                        }
                    } catch (error) {
                        res.status(404).send({error: error.message});
                    }
};

//===================================================================================================================//
//                                      {Reset Password Endpoint}
//===================================================================================================================//
const resetPassword = async (req, res)=>{
                    //Check if Reset Password object is not empty
                    if(!req.body) return res.status(404).send({message: "Object body is empty"});

                    try {
                        //Validate
                        const resetObj = req.body;

                        //Check if id exist
                        const checkId = await Students.find({id: resetObj.id});

                        if(checkId.length <= 0) return res.send({error: "Invalid ID"})

                        //Check if username exist
                        const checkUsername = await Students.find({username: resetObj.username});

                        if(checkUsername.length <= 0) return res.send({error: "Invalid Username"});

                        //Update Password
                        const updatePass = await Students.findOneAndUpdate({id: resetObj.id}, {$set: {password: resetObj.password}});

                        res.send({message: "Password Reset Successful"});
                    } catch (error) {
                        res.status(404).send({error: error.message});
                    }
};

//Export Functions
module.exports = {
    studentRegistration, resetPassword, studentLogin
};
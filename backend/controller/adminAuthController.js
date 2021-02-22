//Import token Function module
const auth = require('../helperFunctions/tokenFunction');

//Import Admin Model
const Admin = require('../model/AdminModel');

//Import Validation
const Validate = require('../ShemaValidations/adminAuthValidation');


//===================================================================================================================//
//                                      {Login Up Endpoint}
//===================================================================================================================//
const login = async (req, res)=>{
                    //Check if login object is not empty
                    if(!req.body) return res.status(404).send({message: "Object body is empty"});
                    
                    try {
                        //Validate
                        const username = req.body.username;
                        const password = req.body.password;
                        
                        //Check if Email exist
                        const usernameExist  = await Admin.find({username});
                        
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
                    //Check if resetPassword object is not empty
                    if(!req.body) return res.status(404).send({message: "Object body is empty"});

                    try {
                        // validate
                        
                        const username = req.body.username;

                        //Check if User Exist
                        const usernameExist = await Admin.find({username});
                        if(usernameExist.length <= 0) return res.send({error: "Username does not exist"});

                        //Reset Password
                        const reset = await Admin.findOneAndUpdate({username}, {$set: {password: req.body.password}});
                        res.send({message: "Password Reset Successful"});

                    } catch (error) {
                        res.status(404).send({error: error.message});
                    }
};

//===================================================================================================================//
//                                      {Create Admin Endpoint}
//===================================================================================================================//
const createAdmin = async (req, res)=>{
    //Check if Create Admin object is not empty
    if(!req.body) return res.status(404).send({message: "Object body is empty"});

    try {
        //Validate
        //Check if username exist
        const usernameExist = await Admin.find({username: req.body.username});
        
        if(usernameExist.length > 0) return res.send({error: "Username already exist"});

        //Create Admin Object
        const adminObj = req.body;

        //Create User
        const createAdmin = await Admin(adminObj).save();

        //Send Success Message
        res.send({message: "Admin Creation Successful", data: createAdmin});

    } catch (error) {
        res.status(404).send({error: error.message});
    }
};

module.exports = {
    login, resetPassword, createAdmin
}
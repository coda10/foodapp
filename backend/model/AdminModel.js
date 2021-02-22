//Import Mongoose Package
const mongoose = require('mongoose');

//Define Admin Schema
const admin_Schema = mongoose.Schema({
                username: String,
                password: String
});

//Initialize Schema
const Admin = mongoose.model('Admin', admin_Schema);

//Export Model
module.exports = Admin;
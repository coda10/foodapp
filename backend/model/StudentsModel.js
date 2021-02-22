//Import Mongoose Package
const mongoose = require('mongoose');

//Define Students Schema
const students_Schema = mongoose.Schema({
    id: String,
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    age:      String,
    orders_for_current_week: Array,
    //orders_for_following_week: Array
});

//Initialize Schema
const Students = mongoose.model('Students', students_Schema);

//Export Model
module.exports = Students;


    
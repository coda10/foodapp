//Import Mongoose Package
const mongoose = require('mongoose');

//Define Students Schema
const menu_Schema = mongoose.Schema({
    menu: {
        monday: [{
                   maindish: String,
                   sauces: String,
                   extras: String,
                }],
        tuesday: [{
                   maindish: String,
                   sauces: String,
                   extras: String,
                }],
        wednesday: [{
                   maindish: String,
                   sauces: String,
                   extras: String,
                }],
        thursday: [{
                   maindish: String,
                   sauces: String,
                   extras: String,
                }],
        friday: [{
                   maindish: String,
                   sauces: String,
                   extras: String,
                }],
   }
});

//Initialize Schema
const Menu = mongoose.model('Menu', menu_Schema);

//Export Model
module.exports = Menu;


    
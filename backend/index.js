//Import Express Package
const express = require('express');

//Initiate Server
const app = express();

//Import Mongoose Package
const mongoose = require('mongoose');

//Import Body-Parser Package
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Import Cors Package
const cors = require('cors');
app.use(cors());

//==============================================
//             {Module Import}
//=============================================
//Import Router Module
const auth = require('./routes/admin/auth');
const student = require('./routes/student/auth');
const StudentDashboard = require('./routes/student/studentdashboard');

//Import Admin Dashboard Module
const adminDashboard = require('./routes/admin/admindashboard');

//Test Index.js
// app.get('/testfood', (req, res)=>{
//     res.send({message: "Congrats, backend works well!"});
// });

//Route to Auth
app.use('/admin', auth);

//Student Route
app.use('/student', student);

//Admin Dashboard Route
app.use('/admindashboard', adminDashboard);

//Admin Dashboard Route
app.use('/studentdashboard', StudentDashboard);


//Connect to Database
mongoose.connect("mongodb://localhost:27017/foodorderingapp", {
        useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
}, (err)=>{
    if(err) console.log({error: err.message});
    else
    console.log("Database Connection Successful");
});

//Define Port Number
const port = 4000;
//Lister on port
app.listen(port, (err)=>{
    if(err) console.log(err);
    else
    console.log(`Server Started on port ${port}`);
})
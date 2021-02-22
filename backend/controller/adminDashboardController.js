//Import token Function module
const auth = require('../helperFunctions/tokenFunction');

//Import Admin Model
const Admin = require('../model/AdminModel');

//Import Students Module
const Students = require('../model/StudentsModel');

//Import Menu Schema
const Menu = require('../model/MenuModel');

//Import Validation
const Validate = require('../ShemaValidations/adminAuthValidation');


//===================================================================================================================//
//                                      {Add Student Endpoint}
//===================================================================================================================//
const addstudent = async (req, res)=>{
                    //Check if Add Student object is not empty
                    if(!req.body) return res.status(404).send({message: "Object body is empty"});

                    try {
                        //Validate
                        
                        const id = req.body.id;
                        //Check if User Exist
                        const studentsExist = await Students.find({id});
                        
                        if(studentsExist.length > 0) return res.send({error: "Student already exist"});
                        
                        //Create Sudent Object
                        const studentsOj = req.body;
                        //Create Student
                        const createStudent = await Students(studentsOj).save();

                        if(createStudent) res.send({message: 'Student Creation Successful'});
                        else
                        res.status(404).send({error: "Student Creation Failed!"});
                    } catch (error) {
                        res.status(404).send({error: error.message});
                    }
};

//===================================================================================================================//
//                                      {Edit Student Endpoint}
//===================================================================================================================//
const editStudent = async (req, res)=>{
                    //Check if object is not empty
                    if(!req.body) return res.status(404).send({message: "Object body is empty"});

                    try {
                        //Validate
                        const id = req.body.id;
                        const studentObj = req.body;
                        const updateStudent = await Students.findOneAndUpdate({id}, {$set: {id: studentObj.id, firstname: studentObj.firstname, 
                                                                                lastname: studentObj.lastname, age: studentObj.age}});
                        if(!updateStudent) return res.send({error: "Update Failed!"});
                        res.send({message: "Update Successful"});
                    } catch (error) {
                        res.status(404).send({error: error.message});
                    }
};

//===================================================================================================================//
//                                      {Delete Student Endpoint}
//===================================================================================================================//
const deleteStudent = async (req, res)=>{
                    //Check if object is not empty
                    if(!req.body) return res.status(404).send({message: "Object body is empty"});
                    try {
                        //Validate

                    const id = req.body.id;
                    await Students.findOneAndDelete({id});
                    res.send({message: "Deletion Successful"});

                    } catch (error) {
                        res.status(404).send({error: error.message});
                    }
};

//===================================================================================================================//
//                                      {View All Students Endpoint}
//===================================================================================================================//
const viewAllStudents = async (req, res)=>{
                    try {
                        const allStudents = await Students.find({}, {id: 1, firstname: 1, lastname: 1, age: 1, });
                        res.send({students: allStudents});

                    } catch (error) {
                        res.status(404).send({error: error.message});
                    }
};

//===================================================================================================================//
//                                      {Create Menu Endpoint}
//===================================================================================================================//
const createMenu = async (req, res)=>{
                    //Check if object is not empty
                    if(!req.body.menu) return res.status(404).send({message: "Object body is empty"});

                    try {
                        //Validate
                        
                        const menu = req.body.menu;
                        //Create Menu
                        const create = await Menu({menu}).save();

                        if(!create) return res.status(404).send({error: "Creation failed!"});

                        res.send({message: "Menu Successfully Created"});
                    } catch (error) {
                        res.status(404).send({error: error.message});
                    }
};

//===================================================================================================================//
//                                      {Load All Menu Endpoint}
//===================================================================================================================//
const ViewallMenu = async (req, res)=>{
                    try {
                        const fetchAllMenu = await Menu.find();

                        res.send({week_menu: fetchAllMenu});
                    } catch (error) {
                        res.status(404).send({error: error.message});
                    }
};

//===================================================================================================================//
//                                      {Edit Menu Endpoint}
//===================================================================================================================//
const editMenu = async (req, res)=>{
                    //Check if object is not empty
                    if(!req.body.menu) return res.status(404).send({message: "Object body is empty"});

                    try {
                        //Validate
                        const menu = req.body;
                        console.log(menu);
                        const UpdateMenu = await Menu.findOneAndUpdate({}, {$set: menu});

                        if(!UpdateMenu) return res.status(404).send({error: "Update Failed"});

                        res.send({message: "Update Successful"});
                    } catch (error) {
                        res.status(404).send({error: error.message});
                    }
};

//===================================================================================================================//
//                                      {Delete Menu Endpoint}
//===================================================================================================================//
const deleteMenu = async (req, res)=>{
                    try {
                        const del = await Menu.remove();
                        res.send({message: "Menu Deleted Successfully"});
                    } catch (error) {
                        res.status(404).send({error: error.message});
                    }
};

//===================================================================================================================//
//                                      {view Orders Endpoint}
//===================================================================================================================//
const viewOrders = async (req, res)=>{
    //
        const fetchAllMenu = await Menu.find();

        const allStudents = await Students.find({}, {firstname: 1, lastname: 1, orders_for_current_week: 1});

        //Monday Menu
        const mondayMenus = fetchAllMenu[0].menu.monday;
        const allMondays = mondayMenus.map(menu => menu);
        
        //Tuesday Menu
        const tuesdayMenus = fetchAllMenu[0].menu.tuesday;
        const allTuesday = tuesdayMenus.map(menu => menu);

        //Wednesday Nenu
        const wednesdayMenus = fetchAllMenu[0].menu.wednesday;
        const allWednesday = wednesdayMenus.map(menu => menu);

        //Thursday Menu
        const thursdayMenus = fetchAllMenu[0].menu.thursday;
        const allThursday = thursdayMenus.map(menu => menu);

        //Friday Menu
        const fridayMenus = fetchAllMenu[0].menu.friday;
        const allFriday = fridayMenus.map(menu => menu);

        //

        const studentsOrders = allStudents.map(student =>{
            //console.log(student.orders_for_current_week[0]);
            return student.orders_for_current_week[0];
        });

        // const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
        let student = [];
        const monda = studentsOrders.map(studentsOrder =>{
                   // const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
                 mondayMenus.map(mondayMenu =>{
                    //  if(mondayMenu._id === studentsOrder.monday[0]._id){
                    //      student.push({firstname: allStudents.firstname, lastname: allStudents.lastname})
                    //  }
                 })
            //console.log(studentsOrder);
                 return studentsOrder;
             })
            //return day;

         console.log(mondayMenus);
        //console.log(student);
        // res.send(fetchAllMenu[0].menu.monday);
         //const {monday, tuesday, wednesday, thursday, friday} = allStudents.orders_for_current_week;

        //res.send({monday: monday});
        //  res.send(allStudents);
        res.send(studentsOrders);
};


module.exports = {
    addstudent, viewAllStudents, deleteStudent, createMenu, editStudent, ViewallMenu, editMenu, deleteMenu, viewOrders
};
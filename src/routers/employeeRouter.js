const Employee = require('../models/employee');
const express = require('express');
const Leave = require('../models/leave');
const router = new express.Router();

//To login
router.get('/login', async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.query.email });

    //if employee is present check the password
    if (employee) {

      //Hashing password with SHA-512
      //creating hash object 
      /*const hash = crypto.createHash('sha512');
      //passing the data to be hashed
      const data = hash.update(req.body.password, 'utf-8');
      //Creating the hash in the required format
      const genHash= data.digest('hex');
      */
      if (employee.password !== req.query.password) {
        return res.status(400).send("invalid password");
      }
      req.session.employee = employee;
      console.log(req.session.employee);
      
      if (employee.empManaged.length !== 0) {
        // return res.status(200).send("Manager");
        return res.status(200).send({ redirect: '/homeManager' });
      } 
      else {
        return res.status(200).send({ redirect: '/homeEmployee' });
        //return res.status(200).send("Non manager");
      }
    } else {
      return res.status(400).send("user not found");
    }    
  }
  catch (e) {
    res.status(400).send(e);
  }
});

//To register
/*router.post('/register', async (req, res) => {
  try {
    const employee = new Employee({
      email: req.body.email,
      password: req.body.password
    });
    console.log(employee);
    await employee.save();
    return res.status(201).send(employee.email+" registered with empId "+employee.empId);
    
  }
  catch (e) {
    res.status(400).send(e);
  }
});*/

//Homepage for employee
router.get('/homeEmployee', async (req, res) => {
  try {  
    //Return to login page on back button press if already logged out
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (!req.session.employee ) {
      return res.redirect('login.html');
    }
    const emp = await Employee.findOne({
      empId : req.session.employee.empId
    });
    const empManager = await Employee.findOne({
      empId : emp.manager
    });

    return res.render('pages/homePageEmployee', { emp : emp, manager : empManager.name });
  }
  catch (e) {
    res.status(400).send(e);
  }
});

//To redirect if already logged in
router.get('/', (req, res) => {
  if(req.session.employee){  
    console.log(req.session.employee); 

    if (employee.empManaged.length !== 0) {
      return res.redirect('/homeManager');
    } 
    return res.redirect('/homeEmployee');
  }
  return res.redirect('login.html');
});

//To update details of an employee
router.post('/updateDetails', async (req, res) => {
  try {
    
    const emp = await Employee.findOneAndUpdate({
      empId : req.session.employee.empId
    },{
      name : req.body.name,
      dateOfBirth : req.body.dateOfBirth,
      phone : req.body.phone
    });
    if (!emp) {
      console.log("Employee not found");
      return res.status(404).send("Employee not found");
    }
    console.log("Details updated.");
    return res.status(200).send("Details updated");
  }
  catch (e) {
    res.status(400).send(e);
  }
});

//To apply for leave
router.post('/applyLeave', async (req, res) => {
  try {
    
    const leave = new Leave({
      appliedBy : req.session.employee.empId,
      appliedTo : req.session.employee.manager,
      startDate : req.body.startDate,
      endDate : req.body.endDate,
      numDays : req.body.numDays,
      reason : req.body.reason
    });
    await leave.save();
    return res.status(201).send("Leave applied with id : "+leave.leaveId);
  }
  catch (e) {
    res.status(400).send(e);
  }
});

//To view leave details
router.get('/viewLeaveDetails', async (req, res) => {
	try {
    //Return to login page on back button press if already logged out
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (!req.session.employee) {
      return res.redirect('login.html');
    }

    const leave = await Leave.find({
      leaveId : req.query.leaveId
    });
    if (employee.empManaged.length !== 0) {
      res.render('pages/leaveDetailsManger', { leave : leave });
    } 
    
    res.render('pages/leaveDetails', { leave : leave });
	} catch (e) {
		res.status(500).send();
	}
});

//To view leave history
router.get('/viewAppliedLeaves', async (req, res) => {
	try {
    //Return to login page on back button press if already logged out
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (!req.session.employee ) {
      return res.redirect('login.html');
    }

    const leaves = await Leave.find({
      appliedBy : req.session.employee.empId
    });
    res.render('pages/viewAppliedLeaves', { leaves : leaves });
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
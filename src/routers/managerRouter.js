require('../constants');
const Employee = require('../models/employee');
const express = require('express');
const Leave = require('../models/leave');
const router = new express.Router();

//Homepage for manager
router.get('/homeManager', async (req, res) => {
  try {  
    //Return to login page on back button press if already logged out
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (!req.session.employee ) {
      return res.redirect('login.html');
    }
    const emp = await Employee.findOne({
      empId : req.session.employee.empId
    });
		
    return res.render('pages/homePageManager', { emp : emp });
  }
  catch (e) {
    res.status(400).send(e);
  }
});

//To view list of leaves
router.get('/viewAppliedLeavesManager', async (req, res) => {
	try {
    //Return to login page on back button press if already logged out
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (!req.session.employee ) {
      return res.redirect('login.html');
    }

    const leaves = await Leave.find({
      appliedTo : req.session.employee.empId,
      status : APPLIED
    });
    res.render('pages/viewAppliedLeavesManager', { leaves : leaves });
	} catch (e) {
		res.status(500).send();
	}
});

//To update the status of applied leaves
router.post('/updateLeaveStatus', async (req, res) => {
  try {
    const leave = await Leave.findOneAndUpdate({
      leaveId : req.query.leaveId
    }, { status: req.query.status });
    if (!leave) {
      console.log("Leave not found");
      return res.status(404).send("Leave not found");
    }
    return res.status(200).send("Leave updated");	
  }
  catch (e) {
    res.status(500).send();
  }
});

//To get the list of employees
router.get('/viewManagedEmployees', async (req, res) => {
  try {

    const employees = await Employee.find({
      empId : { $in: req.session.employee.empManaged }
    });

    if (!employees) {
      return res.status(404).send("Not foubd");
    }

    return res.status(200).send({ employees : employees });
  }
  catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
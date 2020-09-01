const Employee = require('../models/employee');
const express = require('express');
const router = new express.Router();

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
		
    return res.render('pages/Navtrial', { emp : emp });
  }
  catch (e) {
    res.status(400).send(e);
  }
});

  module.exports = router;
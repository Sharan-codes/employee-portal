const Employee = require('../models/employee');
const express = require('express');
const router = new express.Router();

//To login
router.get('/login', async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.query.email });
    console.log(req.query.email);

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
        return res.status(200).send("Manager");
        // return res.redirect('addEvent.html');
      } 
      else {
        return res.status(200).send("Non manager");
        //return res.redirect('/userViewEvents');
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

//To redirect if already logged in
router.get('/', (req, res) => {
  return res.redirect('login.html');
});

module.exports = router;
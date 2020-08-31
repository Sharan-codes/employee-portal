const Employee = require('../models/employee');
const express = require('express');
const router = new express.Router();

router.get('/homeManager', (req, res) => {
    //Return to login page on back button press if already logged out
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    /*if (!req.session.user ) {
      return res.redirect('login.html');
    } */
    return res.render('pages/Navtrial');
  });

  module.exports = router;
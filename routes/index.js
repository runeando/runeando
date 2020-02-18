const express = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");  //This


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/home', ensureLogin.ensureLoggedIn(), (req, res, next) => {  //This
  res.render('home');
});



module.exports = router;

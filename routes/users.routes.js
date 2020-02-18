const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Race = require("../models/Race");

//Shows all users profile
router.get('/', (req, res, next) => {
  User.find(req.params.id)
    .then(allUsers => {
      res.render('users/all-users')
        // res.send(allUsers)})
        .catch(err => console.log(err))
    })

});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.render('users/user-profile', {
      user
    }))
    // .then(user => res.send(user))
    .catch(err => console.log(err))
});



module.exports = router
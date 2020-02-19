const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Race = require("../models/Race");
const ensureLogin = require("connect-ensure-login"); 

//route for races view - card view
router.get('/', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Race.find()
    .then(allRaces => {
     res.render('races/allraces-view', {allRaces})
     })
    .catch(err => console.log(err))
});



//route for races view - googlemaps view
router.get('/map', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Race.find()
    .then(allRaces => res.render('races/allraces-map'))
    //res.send(allRaces)
    .catch(err => console.log(err))
});

//Show the Race details
router.get('/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Race.findById(req.params.id)
    .then(race => res.render('races/race-detail'))
    //res.send(race)
    .catch(err => next())
});

//GET To create a new race - Shows form ???
router.get('/new', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('races/create-race')
});

//POST To create a new race
router.post('/new', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const {
    name,
    description,
    area,
    difficulty,
    length,
    startPoint,
    imgUrl
  } = req.body

  Race.create({
      name,
      description,
      area,
      difficulty,
      length,
      startPoint,
      imgUrl
    })
    .then(newRace => res.json(newRace)) //acceder al id de la race creada, y push al array. traer al array del req.user


    .catch(err => console.log(err))
});


router.get('/edit/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Race.findById(req.params.id)
    .then(race => res.render('races/edit-race'))
    //res.json(race)
    .catch(err => console.log(err))
});


router.post('/edit/:id', ensureLogin.ensureLoggedIn(), ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Race.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    .then(race => res.json(race))
    .catch(err => console.log(err))
});

router.post('/delete/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Race.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/map', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Race.find()
    .then(allRaces => res.render('races/allraces-map'))
    //res.send(allRaces)
    .catch(err => console.log(err))
});

/* Show races from one user */

/*
const races = require('./routes/races.routes');     //races es routes/races.routes
app.use('/races', races);

const users = require('./routes/users.routes');
app.use('/users', users);
*/

module.exports = router
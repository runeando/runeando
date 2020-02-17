const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Race = require("../models/Race");

//route for races view - card view
router.get('/', (req, res, next) => {
  Race.find()
    .then(allRaces => res.send(allRaces))
    .catch(err => console.log(err))
});

//route for races view - googlemaps view
router.get('/map', (req, res, next) => {
  Race.find()
    .then(allRaces => res.send(allRaces))
    .catch(err => console.log(err))
});

//Show the Race details
router.get('/:id', (req, res, next) => {
  Race.findById(req.params.id)
    .then(race => res.send(race))
    .catch(err => next())
});
//GET To create a new race - Shows form ???
router.get('/new', (req, res, next) => {
  res.render('races/create-race')
});

//POST To create a new race
router.post('/new', (req, res, next) => {
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


router.get('/edit/:id', (req, res, next) => {
  Race.findById(req.params.id)
    .then(race => res.json(race))
    .catch(err => console.log(err))
});


router.post('/edit/:id', (req, res, next) => {
  Race.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    .then(race => res.json(race))
    .catch(err => console.log(err))
});

router.post('/delete/:id', (req, res, next) => {
  Race.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router
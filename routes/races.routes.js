const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Race = require("../models/Race");
const ensureLogin = require("connect-ensure-login");

const multer = require('multer')
const upload = multer({
  dest: '../public/uploads'
})
const uploadCloud = require('../config/cloudinary.js')

//route for races view - card view
router.get('/', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Race.find()
    .then(allRaces => {
      res.render('races/allraces-view', {
        allRaces
      })
    })
    .catch(err => console.log(err))
});



//route for races view - googlemaps view
router.get('/map', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Race.find()
    .then(allRaces => {
      res.render('races/allraces-map')

      // res.json(allRaces)
      // console.log(allRaces);
    })
    .catch(err => console.log(err))
});

router.get('/api', (req, res, next) => {
  Race.find()
    .then(allRaces => {
      res.json(allRaces)
    })
    .catch(err => console.log(err))
});


let oneRace
//Show the Race details
router.get('/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  oneRace = req.params.id
  // console.log(oneRace);
  Race.findById(oneRace)
    .then(race => {
      res.render('races/race-detail', race)
    })
    .catch(err => next())
});


router.get('/api/one', (req, res, next) => {
  Race.findById(oneRace)
    .then(race => {
      res.json(race)
      let {
        raceData
      } = req.body
      console.log(raceData);
    })
    .catch(err => console.log(err))
});

//GET To create a new race - Shows form ???
router.get('/new', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('races/create-race')
});

//POST To create a new race
router.post('/new', ensureLogin.ensureLoggedIn(), uploadCloud.single("imgUrl"), (req, res, next) => {
  console.log(req.user._id)
  const {
    name,
    description,
    area,
    difficulty,
    length,

  } = req.body
const imgUrl = req.file ? req.file.url : "";


  const newRace = {
    name,
    description,
    area,
    difficulty,
    length,
    imgUrl,
    startPoint: {
      type: "Point",
      coordinates: [req.body.latitude, req.body.longitude]
    }

  }
  Race.create(newRace)
    .then(raceCreated =>

      User.findOneAndUpdate(req.user.id, {
        $push: {
          races: raceCreated._id
        }
      })
      .then(res.redirect('/races'))
      //acceder al id de la race creada, y push al array. traer al array del req.user
      .catch(err => console.log(err))

      // .then(userUpdated => res.json(userUpdated))
    );

})

router.get('/edit/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Race.findById(req.params.id)
    //.then(race => res.json("races/edit-race"))
    .lean()
    .then(race => {
      race.lat = race.startPoint.coordinates[0]
      race.lng = race.startPoint.coordinates[1]

      res.render('races/edit-race', race)
    })

    .catch(err => console.log(err))
});

router.post('/edit/:id', ensureLogin.ensureLoggedIn(), uploadCloud.single("imgUrl"), (req, res, next) => {
  console.log("entra bien")
  console.log(req.body)

  const {
    name,
    description,
    area,
    difficulty,
    length,
  } = req.body;

  const imgUrl = req.file ? req.file.url : req.body.previousImgUrl;
  console.log(imgUrl)

  let raceToUpdate = {
    name,
    description,
    area,
    difficulty,
    length,
    imgUrl,
    startPoint: {
      type: "Point",
      coordinates: [req.body.latitude, req.body.longitude]
    }
  }
  Race.findByIdAndUpdate(req.params.id, raceToUpdate)
    .then(() => console.log(req.params.id))
    .then(() => res.redirect('/races/myraces'))
    .catch(err => console.log(err))
})

router.post('/delete/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Race.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/races/myraces'))
    .catch(err => console.log(err))
})

/* Show races from one user */
router.get('/myraces', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User
    .findById(req.user._id)
    .populate('races')
    .then(userRaces => {
      //res.json(userRaces);
      res.render('races/myraces', userRaces)
    })
})

router.get('/map', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Race.find()
    .then(allRaces => res.render('races/allraces-map'))
    //res.send(allRaces)
    .catch(err => console.log(err))
});

/* Show races from one user */
router.get('/myraces', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User
  .findById(req.user._id)
  .populate('races')
  .then(userRaces => {
    //res.json(userRaces); //Si quisiera id .id
    res.render('races/myraces', userRaces)
  })
})

//Crear un get con el formulario para GET

/*
const races = require('./routes/races.routes');     //races es routes/races.routes
app.use('/races', races);

const users = require('./routes/users.routes');
app.use('/users', users);
*/

module.exports = router
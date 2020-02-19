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
    .then(allRaces => {
      res.render('races/allraces-map')
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
    .then(race => { res.render('races/race-detail', race) })
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



router.get('/edit/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Race.findById(req.params.id)
    //.then(race => res.json("races/edit-race"))
    .then(race => res.render('races/edit-race', race))
   
    .catch(err => console.log(err))
});



// // for the classic way (update)
// router.post("/updateIngredient", (req, res, next) => {
//   Ingredients.findByIdAndUpdate(req.body._id, req.body).then(() => { 
//     res.redirect("/");
//   });
// });

// // for the modern way (update)
// router.put("/updateIngredient", (req, res, next) => {
//   Ingredients.findByIdAndUpdate(req.body._id, req.body).then(() => {
//     res.json({ updated: true });
//   });
// });

router.post('/edit', (req, res, next) => {
  console.log("entra bien")
  console.log({...req.body});
 const{ name,description,area,difficulty,length,imgUrl} = req.body;
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
    
    // .then(() => res.redirect('/races/myraces'))
    // .then(race => res.json(race))
    

router.post('/delete/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Race.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/races/myraces'))
    .catch(err => console.log(err))
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
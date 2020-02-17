// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Race = require("../models/Race");

const bcryptSalt = 10;

let races = [
  {
      _id: Race01,
      name: "Race01",
      description: "Area Madrid Rio por Marques de Vadillo.",
      length: 1728,
      area: 'MadridRio',
      difficulty: 'Easy',
      startPoint: [40.393507, 3.7017243],
      imgUrl: "https://www.esmadrid.com/sites/default/files/styles/content_type_full/public/recursosturisticos/infoturistica/Top10Puente_1392309099.188.jpg?itok=pFowRMon"
    },
    {
      _id: Race02,
      name: "Race02",
      description: "Correr en Madrid Rio en la zona del puente de los franceses.",
      length: 5000,
      area: 'MadridRio',
      difficulty: 'Medium',
      startPoint: [40.4135562, -3.7218837],
      imgUrl: "https://www.ahoramadrid.com/wp-content/uploads/Vista-general-de-Madrid-R%C3%ADo-con-el-palacio-de-Oriente-al-fondo-640x480.jpg",
    },
     {
       _id: Race03,
       name: "Race03",
       description: "Correr en Parque Manzanares.",
       length: 10500,
       area: 'MadridRio',
       difficulty: 'Hard',
       startPoint: [40.3826568, -3.692763],
       imgUrl: "https://saposyprincesas.elmundo.es/wp-content/uploads/2017/08/parque-lineal-del-manzanares-bofill.jpg",
     },
      {
        _id: Race04,
        name: "Race04",
        description: "Correr en Madrid Rio en la zona del mirador del Manzanares.",
        length: 5000,
        area: 'MadridRio',
        difficulty: 'Medium',
        startPoint: [40.3718274, -3.6838044],
        imgUrl: "https://lh3.googleusercontent.com/-Fbr6EbLKFbQ/TmoIrVFHIgI/AAAAAAAAANE/KdYck4MdMyE/s800/naturaleza-parque-lineal-manzanares.jpg",
      },
       {
         _id: Race05,
         name: "Race05",
         description: "Correr en Casa de Campo desde Parque del Oeste.",
         length: 10000,
         area: 'CasaDeCampo',
         difficulty: 'Medium',
         startPoint: [40.432180, -3.729997],
         imgUrl: "https://www.esmadrid.com/sites/default/files/styles/content_type_full/public/recursosturisticos/infoturistica/parqueoeste_07.jpg",
       },
        {
          _id: Race06,
          name: "Race06",
          description: "Correr en Casa de Campo modo hardcore.",
          length: 20000,
          area: 'CasaDeCampo',
          difficulty: 'Hard',
          startPoint: [40.441783, -3.764586],
          imgUrl: "https://2.bp.blogspot.com/-gvubvC8xWV0/WHNKkyir8tI/AAAAAAAAT_o/n1HxPOVvIu8iINTy0_chW9w3QtiGTvk_ACLcB/s1600/0cdc.jpg",
        }
  ]

mongoose
  .connect('mongodb://localhost/proyectoback', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });




let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})



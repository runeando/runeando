// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Race = require("../models/Race");

const bcryptSalt = 10;

const Race01 = new mongoose.mongo.ObjectId();
const Race02 = new mongoose.mongo.ObjectId();
const Race03 = new mongoose.mongo.ObjectId();
const Race04 = new mongoose.mongo.ObjectId();
const Race05 = new mongoose.mongo.ObjectId();
const Race06 = new mongoose.mongo.ObjectId();
const Race07 = new mongoose.mongo.ObjectId();
const Race08 = new mongoose.mongo.ObjectId();
const Race09 = new mongoose.mongo.ObjectId();
const Race10 = new mongoose.mongo.ObjectId();
const Race11 = new mongoose.mongo.ObjectId();
const Race12 = new mongoose.mongo.ObjectId();
const Race13 = new mongoose.mongo.ObjectId();

let races = [{
    _id: Race01,
    name: "Race01",
    description: "Area Madrid Rio por Marques de Vadillo.",
    length: 1728,
    area: "MadridRio",
    difficulty: "Easy",
    startPoint: {
      type: "Point",
      coordinates: [40.393507, -3.7017243]
    },
    imgUrl: "https://www.esmadrid.com/sites/default/files/styles/content_type_full/public/recursosturisticos/infoturistica/Top10Puente_1392309099.188.jpg?itok=pFowRMon"
  }, {
    _id: Race02,
    name: "Race02",
    description: "Correr en Madrid Rio en la zona del puente de los franceses.",
    length: 5000,
    area: "MadridRio",
    difficulty: "Medium",
    startPoint: {
      type: "Point",
      coordinates: [40.4135562, -3.7218837]
    },
    imgUrl: "https://www.ahoramadrid.com/wp-content/uploads/Vista-general-de-Madrid-R%C3%ADo-con-el-palacio-de-Oriente-al-fondo-640x480.jpg"
  },
  {
    _id: Race03,
    name: "Race03",
    description: "Correr en Parque Manzanares.",
    length: 10500,
    area: "MadridRio",
    difficulty: "Hard",
    startPoint: {
      type: "Point",
      coordinates: [40.392621, -3.700767]
    },
    imgUrl: "https://saposyprincesas.elmundo.es/wp-content/uploads/2017/08/parque-lineal-del-manzanares-bofill.jpg"
  },
  {
    _id: Race04,
    name: "Race04",
    description: "Correr en Madrid Rio en la zona del mirador del Manzanares.",
    length: 5000,
    area: "MadridRio",
    difficulty: "Medium",
    startPoint: {
      type: "Point",
      coordinates: [40.3718274, -3.6838044]
    },
    imgUrl: "https://lh3.googleusercontent.com/-Fbr6EbLKFbQ/TmoIrVFHIgI/AAAAAAAAANE/KdYck4MdMyE/s800/naturaleza-parque-lineal-manzanares.jpg"
  },
  {
    _id: Race05,
    name: "Race05",
    description: "Correr en Casa de Campo desde Parque del Oeste.",
    length: 10000,
    area: "CasaDeCampo",
    difficulty: "Medium",
    startPoint: {
      type: "Point",
      coordinates: [40.43218, -3.729997]
    },
    imgUrl: "https://www.esmadrid.com/sites/default/files/styles/content_type_full/public/recursosturisticos/infoturistica/parqueoeste_07.jpg"
  },
  {
    _id: Race06,
    name: "Race06",
    description: "Correr en Casa de Campo modo hardcore.",
    length: 20000,
    area: "CasaDeCampo",
    difficulty: "Hard",
    startPoint: {
      type: "Point",
      coordinates: [40.441783, -3.764586]
    },
    imgUrl: "https://2.bp.blogspot.com/-gvubvC8xWV0/WHNKkyir8tI/AAAAAAAAT_o/n1HxPOVvIu8iINTy0_chW9w3QtiGTvk_ACLcB/s1600/0cdc.jpg"
  },
  {
    _id: Race07, 
    name: "Race07",
    description: "Corriendo por Casa de Campo.",
    length: 13000,
    area: "CasaDeCampo",
    difficulty: "Medium",
    startPoint: {
      type: "Point",
      coordinates: [40.4204, -3.73485]
    },
    route: [{  
      type: "Point",
      coordinates: [40.4204, -3.73485]
    },
    {
      type: "Point",
      coordinates: [40.41622, -3.74601]
    }, 
    {
      type: "Point",
      coordinates: [40.40982, -3.75631]
    },
    {
      type: "Point",
      coordinates: [40.40459, -3.76369]
    },
    {
      type: "Point",
      coordinates: [40.41047, -3.77673]
    }, 
    {
      type: "Point",
      coordinates: [40.42302, -3.77725]
    },
    {
      type: "Point",
      coordinates: [40.4387, -3.78137]
    }, 
    {
      type: "Point",
      coordinates: [40.44353, -3.76866]
    },
    {
      type: "Point",
      coordinates: [40.44431, -3.75442]
    },
    {
      type: "Point",
      coordinates: [40.43669, -3.74438]
    }, 
    {
      type: "Point",
      coordinates: [40.43055, -3.7382]
    },
    {
      type: "Point",
      coordinates: [40.42349, -3.73287]
    }
  ],
    imgUrl: "https://madridsecreto.co/wp-content/uploads/2019/01/LagoCasaCampo_1.jpg"
  },
  {
    _id: Race08,
    name: "Race08",
    description: "Medio Maratón en Lago, Casa de Campo.",
    length: 8000,
    area: "CasaDeCampo",
    difficulty: "Hard",
    startPoint: {
      type: "Point",
      coordinates: [40.45962, -3.75712]
    },
    route: [{  
      type: "Point",
      coordinates: [40.45962, -3.75712]
    },
    {
      type: "Point",
      coordinates: [40.44825, -3.74802]
    }, 
    {
      type: "Point",
      coordinates: [40.43885, -3.74304]
    },
    {
      type: "Point",
      coordinates: [40.42754, -3.73575]
    },
    {
      type: "Point",
      coordinates: [40.4199, -3.72279]
    }, 
    {
      type: "Point",
      coordinates: [40.40703, -3.72296]
    },
    {
      type: "Point",
      coordinates: [40.39801, -3.71292]
    }, 
    { 
      type: "Point",
      coordinates: [40.39238, -3.70219]
    }
  ],
    imgUrl: "https://lh5.googleusercontent.com/p/AF1QipOAXbPxUCGOdE5Z6BTrzFSzuzztNp0RbEy98XBM=w408-h272-k-no"
  },
  {
    _id: Race09,
    name: "Race09",
    description: "La cuesta un poco dura, destroza piernas.",
    length: 5000,
    area: "CasaDeCampo",
    difficulty: "Hard",
    startPoint: {
      type: "Point",
      coordinates: [40.38163, -3.68876]
    },
    route: [{  
      type: "Point",
      coordinates: [40.38163, -3.68876]
    },
    {
      type: "Point",
      coordinates: [40.38836, -3.69828]
    }, 
    {
      type: "Point",
      coordinates: [40.39516, -3.70695]
    },
    {
      type: "Point",
      coordinates: [40.39948, -3.71622]
    },
    {
      type: "Point",
      coordinates: [40.40791, -3.72274]
    }
  ],
    imgUrl: "https://lh5.googleusercontent.com/p/AF1QipMt5V0VP3aa9DlR5a6FMLd1ObeD6Z-7Ou4oyYOn=w408-h306-k-no"
  },
  {
    _id: Race10,
    name: "Race10",
    description: "Bastante barro tras la lluvia.",
    length: 8000,
    area: "CasaDeCampo",
    difficulty: "Medium",
    startPoint: {
      type: "Point",
      coordinates: [40.44345, -3.75527]
    },
    route: [{  
      type: "Point",
      coordinates: [40.44345, -3.75527]
    },
    {
      type: "Point",
      coordinates: [40.43666, -3.74841]
    }, 
    {
      type: "Point",
      coordinates: [40.42914, -3.74506]
    },
    {
      type: "Point",
      coordinates: [40.42176, -3.74635]
    },
    {
      type: "Point",
      coordinates: [40.4166, -3.75656]
    },
    {
      type: "Point",
      coordinates: [40.42581, -3.7642]
    },
    {
      type: "Point",
      coordinates: [40.4364, -3.76532]
    },
    {
      type: "Point",
      coordinates: [40.44378, -3.75656]
    }
  ],
    imgUrl: "https://lh5.googleusercontent.com/p/AF1QipOY2mHobtAbW1JjL22v5nImqcdIt7ZcC9WdBwaR=w428-h240-k-no"
  },
  {
    _id: Race11,
    name: "Race11",
    description: "Han cambiado el asfalto, muy recomendable a última hora del día.",
    length: 8100,
    area: "MadridRio",
    difficulty: "Easy",
    startPoint: {
      type: "Point",
      coordinates: [40.4526, -3.77939]
    },
    route: [{  
      type: "Point",
      coordinates: [40.4526, -3.77939]
    },
    {
      type: "Point",
      coordinates: [40.44391, -3.77999]
    }, 
    {
      type: "Point",
      coordinates: [40.43731, -3.78377]
    },
    {
      type: "Point",
      coordinates: [40.42888, -3.78738]
    },
    {
      type: "Point",
      coordinates: [40.42235, -3.78901]
    },
    {
      type: "Point",
      coordinates: [40.41621, -3.79055]
    },
    {
      type: "Point",
      coordinates: [40.41072, -3.78686]
    },
    {
      type: "Point",
      coordinates: [40.40359, -3.78205]
    }
  ],
    imgUrl: "https://lh5.googleusercontent.com/p/AF1QipNV1mmGo742Swk5wqmK3J5R0XYYGJswnCoyF6l_=w408-h306-k-no"
  },
  {
    _id: Race12,
    name: "Race12",
    description: "Bastantes bicicletas.",
    length: 5000,
    area: "MadridRio",
    difficulty: "Easy",
    startPoint: {
      type: "Point",
      coordinates: [40.40399, -3.72317]
    },
    route: [{  
      type: "Point",
      coordinates: [40.40399, -3.72317]
    },
    {
      type: "Point",
      coordinates: [40.39751, -3.71648]
    }, 
    {
      type: "Point",
      coordinates: [40.39313, -3.7248]
    },
    {
      type: "Point",
      coordinates: [40.3883, -3.73141]
    }
  ],
    imgUrl: "https://lh5.googleusercontent.com/p/AF1QipOCnjK3bnPf_u6XsRW-D16CC91z5zqmd9vcCqTX=w408-h306-k-no"
  },
  {
    _id: Race13,
    name: "Race13",
    description: "H emos ido a cuatro minutos el kilómetro, Genial.",
    length: 5200,
    area: "MadridRio",
    difficulty: "Easy",
    startPoint: {
      type: "Point",
      coordinates: [40.38941, -3.69923]
    },
    route: [{  
      type: "Point",
      coordinates: [40.38941, -3.69923]
    },
    {
      type: "Point",
      coordinates: [40.39497, -3.70515]
    }, 
    {
      type: "Point",
      coordinates: [40.39, -3.71219]
    },
    {
      type: "Point",
      coordinates: [40.37999, -3.72635]
    }
  ],
    imgUrl: "https://lh5.googleusercontent.com/p/AF1QipOjlEysQnZKn_P2kXtvUyeAERCrHd0y17ikDF_i=w426-h240-k-no"
  }
];




let users = [{
    username: "anna",
    password: bcrypt.hashSync("anna", bcrypt.genSaltSync(bcryptSalt)),
    age: 32,
    genre: "female",
    avatarUrl: "images/anna.jpg",
    races: [Race01, Race02]
  },
  {
    username: "charles",
    password: bcrypt.hashSync("charles", bcrypt.genSaltSync(bcryptSalt)),
    age: 38,
    genre: "female",
    avatarUrl: "images/charles.jpg",
    races: [Race03]
  },
  {
    username: "marta",
    password: bcrypt.hashSync("marta", bcrypt.genSaltSync(bcryptSalt)),
    age: 41,
    genre: "female",
    avatarUrl: "images/marta.jpg",
    races: [Race04, Race05, Race06]
  },
  {
    username: "dolores",
    password: bcrypt.hashSync("dolores", bcrypt.genSaltSync(bcryptSalt)),
    age: 33,
    genre: "female",
    avatarUrl: "images/dolores.jpg",
    races: [Race07, Race08]
  },
  {
    username: "peter",
    password: bcrypt.hashSync("peter", bcrypt.genSaltSync(bcryptSalt)),
    age: 28,
    genre: "male",
    avatarUrl: "images/peter.jpg",
    races: [Race09, Race10]
  },
  {
    username: "ray",
    password: bcrypt.hashSync("ray", bcrypt.genSaltSync(bcryptSalt)),
    age: 31,
    genre: "other",
    avatarUrl: "images/ray.jpg",
    races: [Race11, Race12, Race13]
  }
];

mongoose
  .connect(`${process.env.MONGODB_URL}`, {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//Users
User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

//Races
Race.deleteMany()
  .then(() => {
    return Race.create(races);
  })
  .then(racesCreated => {
    console.log(`${racesCreated.length} races created with the following id:`);
    console.log(racesCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
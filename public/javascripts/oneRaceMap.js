let initialCoords = {
    lat: 40.408537,
    lng: -3.7205721,
  },
  oneMap


function initOneRaceMap() {

  let mapOptions = {
    center: initialCoords, ///coords from req.params?
    zoom: 12,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false

  }
  oneMap = new google.maps.Map(document.querySelector('#oneRaceMap'), mapOptions)
  //this var currentRaceId comes from the race-detail hbs file
  getOneRace(currentRaceId)

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center map with user location


      let imageRunner = "../images/marker2.png"

      // Add a marker for your user location
      let runner = new google.maps.Marker({
        position: user_location,
        map: oneMap,
        icon: imageRunner,
        animation: google.maps.Animation.BOUNCE,
        title: "You are here."
      });


    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }
}

function getOneRace(currentRaceId) {
  axios.get("/races/api/one/" + currentRaceId)
    .then(response => {
      const race = response.data
      raceInMap(race)
    })
    .catch(error => console.log(error))
}

function raceInMap(race) {

  // const destiny = {
  //   lat: race.endPoint.coordinates[0],
  //   lng: race.endPoint.coordinates[1]
  // }



  const center = {
    lat: race.route[0].coordinates[0],
    lng: race.route[0].coordinates[1],
  }
  oneMap.setCenter(center);
  new google.maps.Marker({
    position: center,
    map: oneMap,
    title: race.name,
  })

  const directionsService = new google.maps.DirectionsService;
  const directionsDisplay = new google.maps.DirectionsRenderer;

const wayPoints = []

race.route.forEach(elem => {
  wayPoints.push(
    {
      location: {
        lat: elem.coordinates[0],
        lng: elem.coordinates[1]
      },
      stopover: false
    }
  )
})
  const directionRequest = {
    origin: {
      lat: race.route[0].coordinates[0],
      lng: race.route[0].coordinates[1],
    },
    destination: {
      lat: race.route[race.route.length - 1].coordinates[0],
      lng: race.route[race.route.length - 1].coordinates[1]
    },
    travelMode: 'WALKING',
    waypoints: wayPoints
  };


  directionsService.route(
    directionRequest,
    function (response, status) {
      if (status === 'OK') {
        // everything is ok
        directionsDisplay.setDirections(response);

      } else {
        // something went wrong
        window.alert('Directions request failed due to ' + status);
      }
    }
  );

  directionsDisplay.setMap(oneMap);

}
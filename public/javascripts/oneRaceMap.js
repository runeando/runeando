let initialCoords = {
    lat: 40.408537,
    lng: -3.7205721,
  },
  oneMap


function initOneRaceMap() {

  let mapOptions = {
    center: initialCoords, ///coords from req.params?
    zoom: 13
  }
  oneMap = new google.maps.Map(document.querySelector('#oneRaceMap'), mapOptions)
  getOneRace()

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center map with user location
      // myMap.setCenter(user_location);

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

function getOneRace() {
  axios.get("/races/api/one")
    .then(response => {
      const race = response.data
      raceInMap(race)
    })
    .catch(error => console.log(error))
}

function raceInMap(raceParams) {
  const center = {
    lat: raceParams.startPoint.coordinates[0],
    lng: raceParams.startPoint.coordinates[1]
  }
  console.log(center);
  new google.maps.Marker({
    position: center,
    map: oneMap,
    title: raceParams.name,
  })



}


let initialCoords = {
    lat: 40.408537,
    lng: -3.7205721,
  },
  myMap

function initMap() {
  let mapOptions = {
    center: initialCoords,
    zoom: 13,
    mapTypeControl: false,
    streetViewControl: false,
    // zoomControl: false,
    fullscreenControl: false
  }
  myMap = new google.maps.Map(document.querySelector('#racesMap'), mapOptions)
  getRaces()

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
        map: myMap,
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

function getRaces() {

  axios.get("/races/api")
    .then(response => {
      const allRaces = response.data

      racesInMap(allRaces)
      console.log(allRaces)
    })
    .catch(error => console.log(error))
}


function racesInMap(races) {

  markerArr = []
  races.forEach(race => {
    let infowindow;
    const center = {

      lat: race.startPoint.coordinates[0],
      lng: race.startPoint.coordinates[1]
    }

    let marker = new google.maps.Marker({
      position: center,
      map: myMap,
      title: race.name,
    })

    marker.addListener('click', function () {
      infowindow = new google.maps.InfoWindow({
        content: `<a href="${process.env.URL}/races/${race._id}">Open ${race.name}</a>`
      });

      infowindow.open(myMap, marker);
    });
  })
}

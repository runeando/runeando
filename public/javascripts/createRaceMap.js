let theMap;
let markers = [];
let madrid = {
  lat: 40.416928,
  lng: -3.703492
};
window.onload = function () {
  startMainMap(theMap);
  startDetailMap(theMap);
};

function initNewRaceMap() {

  theMap = new google.maps.Map(document.getElementById("map-detail"), {
    zoom: 13,
    center: {
      lat: 40.41379127477614,
      lng: -3.707440211669921
    },
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  })

  let lat = Number(document.getElementById("lat").value)
  let lng = Number(document.getElementById("lng").value)
  console.log(lat, lng)

  showPlace(theMap, lat, lng)

}

function showPlace(theMap, lat, lng) {
  let latDomEl = document.getElementById("lat");
  let lngDomEl = document.getElementById("lng");
  let name = document.getElementById("name")

  let marker = new google.maps.Marker({
    position: madrid,
    map: theMap,
    title: name,
    animation: google.maps.Animation.DROP,
    draggable: true,
  });

  marker.addListener("dragend", function () {
    latDomEl.setAttribute("value", `${marker.getPosition().lat()}`);
    lngDomEl.setAttribute("value", `${marker.getPosition().lng()}`);
  })

}


function showPlaces(theMap) {
  axios.get("http://localhost:3000/allPlaces").then(allPlaces => {
    var iconBase = '../../images/';
    allPlaces.data.forEach(place => {
      setTimeout(() => {
        new google.maps.Marker({
          position: {
            lat: place.pos.lat,
            lng: place.pos.lng
          },
          map: theMap,
          title: place.name,
          animation: google.maps.Animation.DROP,
          draggable: false,
          icon: iconBase + "icon_coffee.png"
        });
      }, randomFloat(0.25, 1.25) * 1000);

    });

  });
}




function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
let theMap;
let markers = [];
let madrid = {
  lat: 40.41379127477614,
  lng: -3.707440211669921
};


function initNewRaceMap() {

  theMap = new google.maps.Map(document.getElementById("map-detail"), {
    zoom: 13,
    center: madrid,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  })

  let lat = Number(document.getElementById("lat").value)
  let lng = Number(document.getElementById("lng").value)

  showPlace(theMap, lat, lng)

  theMap.addListener('click', function (e) {
    console.log(e)
    const marker2 = new google.maps.Marker({
      position: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
      map: theMap,
      title: name,
      animation: google.maps.Animation.DROP,
      draggable: true,
    });


    let DOMEl = document.querySelector('.coordinates')
    DOMEl.innerHTML += `<div class="col-8">
        <input id="lat" name="latitudeArr" value="${marker2.position.lat()}" type="hidden" class="form-control" size="50">
        <input id="lng" name="longitudeArr" value="${marker2.position.lng()}" type="hidden" class="form-control" size="50"></div>`
  })

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


function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
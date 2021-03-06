let editMap;
let markers = [];
let madrid = {
  lat: 40.41379127477614,
  lng: -3.707440211669921
};


function initEditRaceMap() {

  editMap = new google.maps.Map(document.getElementById("map-detail"), {
    zoom: 13,
    center: madrid,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  })

  let lat = Number(document.getElementById("lat").value)
  let lng = Number(document.getElementById("lng").value)

  showPlace(editMap, lat, lng)



  editMap.addListener('click', function (e) {
    console.log(e)
    const marker2 = new google.maps.Marker({
      position: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
      map: editMap,
      title: name,
      animation: google.maps.Animation.DROP,
      draggable: true,
    });


    let DOMEl = document.querySelector('.coordinates')
    DOMEl.innerHTML += `<div class="col-8">
        <input id="lat" name="latitudeEditArr" value="${marker2.position.lat()}" type="hidden" class="form-control" size="50">
        <input id="lng" name="longitudeEditArr" value="${marker2.position.lng()}" type="hidden" class="form-control" size="50"></div>`
  })

}

function showPlace(editMap, lat, lng) {
  let latDomEl = document.getElementById("lat");
  let lngDomEl = document.getElementById("lng");
  let name = document.getElementById("name")

  let marker = new google.maps.Marker({
    position: madrid,
    map: editMap,
    title: name,
    animation: google.maps.Animation.DROP,
    draggable: true,
  });

  marker.addListener("dragend", function () {
    latDomEl.setAttribute("value", `${marker.getPosition().lat()}`);
    lngDomEl.setAttribute("value", `${marker.getPosition().lng()}`);
  })

}


// function showPlaces(editMap) {
//   axios.get("http://localhost:3000/allPlaces").then(allPlaces => {
//     var iconBase = '../../images/';
//     allPlaces.data.forEach(place => {
//       setTimeout(() => {
//         new google.maps.Marker({
//           position: {
//             lat: place.pos.lat,
//             lng: place.pos.lng
//           },
//           map: editMap,
//           title: place.name,
//           animation: google.maps.Animation.DROP,
//           draggable: false,
//           icon: iconBase + "icon_coffee.png"
//         });
//       }, randomFloat(0.25, 1.25) * 1000);

//     });

//   });
// }




function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
var map;
var service;
var infowindow;
var geocoder;
var gobutton = document.getElementById("gobutton")
var userlocation;
var displaylist = document.getElementById("list")

function initMap() {

  console.log(userlocation[0].geometry.location)

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'));

  var request = {
    location: userlocation[0].geometry.location,
    radius: '200',
    type: ['restaurant']
  };

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var listname = document.createElement('h1');
        listname.textContent = results[i].name;
        var listaddress = document.createElement('li');
        listaddress.textContent = results[i].vicinity;
        displaylist.appendChild(listname);
        listname.appendChild(listaddress);
        console.log(results[i]);
      }
    }
  }
}

function initialize() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'));
}

gobutton.addEventListener("click", function codeAddress() {
  var address = document.getElementById('user-search').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
    userlocation = results
    initMap()
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
})
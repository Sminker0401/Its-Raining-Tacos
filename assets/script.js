var map;
var service;
var infowindow;
var gobutton = document.getElementById("gobutton")

gobutton.addEventListener("click", function initMap() {

  var userquery = document.getElementById("user-search").value

  console.log(userquery)

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {});

  var request = {
    query: userquery,
    fields: ['name', 'geometry', 'formatted_address'],
  };

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
})
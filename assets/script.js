var map;
var service;
var infowindow;
var geocoder;
var gobutton = document.getElementById("gobutton");
var userlocation;
var displaylist = document.getElementById("list");
var address;

// Below function runs when page loads

function initialize() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById("map"));
}

// Above function runs when page loads

// Below function runs when User clicks "Go" button. (finds goelocation of user search)

gobutton.addEventListener("click", function codeAddress() {
  var address = document.getElementById("user-search").value;
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      userlocation = results;
      gettemp();
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
});

// Below function runs when User clicks "Go" button. (displays restaurants within a radius of the user search geo location)

function gettemp() {
  // Weather API below here

  console.log("hello world");

  var address = document.getElementById("user-search").value;

  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${address}&units=imperial&appid=04c358570a8428feb8acff9034f9c7b2`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var userlocationtemp = data.main.temp;
      console.log(typeof userlocationtemp);
      tempresults = document.getElementById("temp-results");
      if (userlocationtemp < 65) {
        tempresults.textContent =
          "It's a little cold in " +
          address +
          ". Here are some recommendations to warm you up.";
        var restaurantsuggest = "cold";
        initMap(restaurantsuggest);
      } else if (userlocationtemp < 75) {
        tempresults.textContent =
          "Spring is in the air in " +
          address +
          ". Here are some recommendations to enjoy this nice weather.";
        var restaurantsuggest = "nice";
        initMap(restaurantsuggest);
      } else if (userlocationtemp < 90) {
        tempresults.textContent =
          "It's heating up in " +
          address +
          ". Here are some chill spots to get a bite.";
        var restaurantsuggest = "warm";
        initMap(restaurantsuggest);
      } else {
        tempresults.textContent =
          "It's a scorcher in " + address + ". Here are some frosty hangouts.";
        var restaurantsuggest = "hot";
        initMap(restaurantsuggest);
      }
    });

  // Weather API above here
}

function initMap(restaurantsuggest) {
  // Google Maps API below here

  console.log(userlocation[0].geometry.location);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"));

  var request = {
    location: userlocation[0].geometry.location,
    radius: "100",
    type: ["restaurant"],
  };

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  // Remove old search results below here

  while (displaylist.hasChildNodes()) {
    displaylist.removeChild(displaylist.firstChild);
  }

  // Remove old search results above here

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(restaurantsuggest);

      // if (restaurantsuggest = "warm") {
      //   results
      // }

      for (var i = 0; i < results.length; i++) {
        var listname = document.createElement("h1");
        listname.textContent = results[i].name;
        var listaddress = document.createElement("li");
        listaddress.textContent = results[i].vicinity;
        displaylist.appendChild(listname);
        listname.appendChild(listaddress);
        console.log(results[i]);
      }
    }
  }
}

// Google Maps API above here

const textList = [" Tacos", " Ice Cream", " Burgers", " Sushi"];

const cycle = document.querySelector("#cycle");
let i = 0;
const cycleText = () => {
  cycle.innerHTML = " " + textList[i];
  i = ++i % textList.length;
};
cycleText();
setInterval(cycleText, 1000);

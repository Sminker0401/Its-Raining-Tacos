var map;
var service;
var infowindow;
var geocoder;
var gobutton = document.getElementById("gobutton");
var userlocation;
var displaylist = document.getElementById("list");
var userevent = document.getElementById("user-search");
var address;

// Below funtion allows user to click "Go" button with enter key

userevent.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      gobutton.click();
    }
  });

// Below function runs when page loads

function initialize() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById("map"));
}

// Above function runs when page loads

// Below function runs when User clicks "Go" button. (finds geolocation of user search)

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
      console.log(userlocationtemp);
      tempresults = document.getElementById("temp-results");
      if (userlocationtemp < 65) {
        tempresults.textContent =
          "It's a little cold in " +
          address +
          ", the temperature is " +
          Math.floor(userlocationtemp) +
          "°. Here are some recommendations to warm you up.";
        var restaurantsuggest = "Soup";
        initMap(restaurantsuggest);
      } else if (userlocationtemp < 75) {
        tempresults.textContent =
          "Spring is in the air in " +
          address +
          ", the temperature is " +
          Math.floor(userlocationtemp) +
          "°. Here are some recommendations to enjoy this nice weather.";
        var restaurantsuggest = "Tacos";
        initMap(restaurantsuggest);
      } else if (userlocationtemp < 90) {
        tempresults.textContent =
          "It's heating up in " +
          address +
          ", the temperature is " +
          Math.floor(userlocationtemp) +
          "°. Here are some chill spots to get a bite.";
        var restaurantsuggest = "Ice Cream";
        initMap(restaurantsuggest);
      } else {
        tempresults.textContent =
          "It's a scorcher in " +
          address +
          ", the temperature is " +
          Math.floor(userlocationtemp) +
          "°. Here are some frosty hangouts.";
        var restaurantsuggest = "Ice Cream";
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
    radius: "9000",
    query: restaurantsuggest,
  };

  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

  // Remove old search results below here

  while (displaylist.hasChildNodes()) {
    displaylist.removeChild(displaylist.firstChild);
  }

  // Remove old search results above here

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(restaurantsuggest);

      for (var i = 0; i < 4; i++) {
        var listname = document.createElement("h1");
        listname.textContent = results[i].name;
        var listaddress = document.createElement("li");
        listaddress.textContent = "\xa0- " + results[i].formatted_address;
        displaylist.appendChild(listname);
        listname.appendChild(listaddress);
        console.log(results[i]);
      }
    }
  }
}

// Google Maps API above here

const textList = [" Tacos!", " Ice Cream!", " Burgers!", " Sushi!"];

const cycle = document.querySelector("#cycle");
let i = 0;
const cycleText = () => {
  cycle.innerHTML = " " + textList[i];
  i = ++i % textList.length;
};
cycleText();
setInterval(cycleText, 1500);

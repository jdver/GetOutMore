// JS for Get Out More - Project 1
'use strict'
// weather api
// This is Kris's API key for the weather
const APIKey = "e9cf524d552ebbdf618ed3daa5819d90";

// these are the variables that will hold our user input data for city and state
// remove the default text values for these userCity and userState variables once our submit button works
// i have written what i think will grab the right values from our input fields, they're just commented out for now
var userCity = "Baltimore";
//var userCity = document.getElementById("inputCity").value;
console.log(userCity);
var userState = "Maryland";
// var userState = document.getElementById("inputState").value;

/* a button needs to be created in order to be pressed for submission (for a click event)
so that userCity and userState variables will be populated with the values of their input fields
*/
var weatherLocation = `${userCity},${userState}`;
var weatherDescription = "";
var weatherIcon = null;
var temperature = null;

// Here we are building the URL we need to query the database

// this was the example url from a class activity, the location was just manually in the url (no variable)
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
//   "q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;

// here is the url we would use for current weather data for a given city (using a variable for the location)
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherLocation +
// "&units=imperial&appid=" + APIKey;

// here is the url we would use for a forecast for a given city (gives weather in 3 hour intervals)
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + weatherLocation +
"&units=imperial&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
// this needs to be set up with a click event with our submit button
//
// the fetch request needs to have an if statement about if the browser supports fetch
fetch(queryURL, {
    method: "GET"
    })
    .then((result) => result.json()) // make our response object a json object of the results
    .then((response) => { // accept the result.json() returned from the previous callback as response
        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // pulling a piece of the JSON data, in this case the weather condition (e.g. "clear sky")
        console.log(response.list[0].weather[0].description);
        weatherDescription = response.list[0].weather[0].description;
        // testing that the variable is capturing the desired target (e.g. "clear sky")
        console.log(weatherDescription);
        // grabbing the weather icon image number that will be used in the img tage below
        weatherIcon = response.list[0].weather[0].icon;
        // grabbing the temperature data -- this needs to be shortened / rounded to just two digits, no decimals
        temperature = response.list[0].main.temp;

        // assigning weather data into variables
        var weatherDisplay = document.createElement("div");
        console.log(weatherDescription);
        // pull weather icons from: https://openweathermap.org/weather-conditions to use in img tags
        weatherDisplay.innerHTML = `<p><img src="http://openweathermap.org/img/w/${weatherIcon}.png"> ${temperature}F ${weatherDescription}</p>`;
        // appending the weatherDisplay html into the resultsDisplay div
        document.getElementById("resultsDisplay").appendChild(weatherDisplay);
    });



const APIKey2 = "AIzaSyDwS9kORdJagydPY9p50u2rkQdlt46d1WM"
var queryURL2 = "https://www.googleapis.com/customsearch/v1?key=" + APIKey2 +
"&cx=017456614146260198716:zjzb0jps8te&q=" + userCity + "+" + userState + "+events";

// Here we run our AJAX call to the OpenWeatherMap API
// this needs to be set up with a click event
fetch(queryURL2, {
method: "GET"
})
.then((result) => result.json()) // make our response object a json object of the results
.then((response) => { // accept the result.json() returned from the previous callback as response
// Log the queryURL
console.log(queryURL2);

// Log the resulting object
console.log(response);

for (let i = 0; i < 4; i++) {
    let newEventColumn = document.createElement("div");
    newEventColumn.setAttribute("class", "col-2");
    var eventImage = response.items[i].pagemap.cse_thumbnail[0].src;
    console.log(eventImage);
    var eventDisplay = document.createElement("div");
    eventDisplay.innerHTML = `<img src="${eventImage}" alt="display">`;
    document.getElementById("eventsDisplay").appendChild(eventDisplay);
};
});





  
// need to add an XHR request in case fetch is not support it
/* XHR request needs to be tested by setting the if statement for the fetch request to "not supported"
so it will default to the XHR request instead. this can be verified with a console.log within the
XHR request, e.g. "XHR is running."
*/

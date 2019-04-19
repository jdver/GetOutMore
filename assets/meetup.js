// JS for Get Out More - Project 1

// weather api
// This is Kris's API key for the weather
const APIKey = "e9cf524d552ebbdf618ed3daa5819d90";

// these are the variables that will hold our user input data for city and state
// var userCity = "Baltimore";
var userCity = document.getElementById("inputCity").value;
console.log(userCity);
var userState = "Maryland";
// var userState = document.getElementById("inputState").value;

/* a button needs to be created in order to be pressed for submission (for a click event)
so that userCity and userState variables will be populated with the values of their input fields
*/
var weatherLocation = `${userCity},${userState}`;

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
// this needs to be set up with a click event
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

        // Transfer content to HTML -- this is from the class activity and needs to be updated
        // let heading = document.createElement("h1");
        // heading.innerText = `${response.name} Weather Details`;
        // document.querySelector(".city").appendChild(heading);
        
        // document.querySelector(".wind").innerText = `Wind Speed: ${response.wind.speed}`;
        // document.querySelector(".humidity").innerText = `Humidity: ${response.main.humidity}`;
        // document.querySelector(".temp").innerText = `Temperature (F) ${response.main.temp}`;


    });
  
// pull weather icons from: https://openweathermap.org/weather-conditions to use in img tags
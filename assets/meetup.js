// JS for Get Out More - Project 1
'use strict'
// weather api
// This is Kris's API key for the weather
const APIKEY = "e9cf524d552ebbdf618ed3daa5819d90";

// these are the variables that will hold our user input data for city and state
// remove the default text values for these userCity and userState variables once our submit button works
// i have written what i think will grab the right values from our input fields, they're just commented out for now

/* a button needs to be created in order to be pressed for submission (for a click event)
so that userCity and userState variables will be populated with the values of their input fields
*/
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

document.getElementById("searchButton").addEventListener("click", function(event) {
    // we prevent the default of refreshing the page when the form button is pressed  
    event.preventDefault();
    
    var userCity = document.getElementById("inputCity").value;
    var userState = document.getElementById("inputState").value;
    var weatherLocation = `${userCity},${userState}`;

    // here is the url we would use for a forecast for a given city (gives weather in 3 hour intervals)
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + weatherLocation +
    "&units=imperial&appid=" + APIKEY;

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

            // setting up an initial 5-day forecast div to display before the weather data
            var forecastIntro = document.createElement("div");
            forecastIntro.setAttribute("class", "col-2");
            forecastIntro.innerHTML = `<p>5-day weather forecast for ${userCity}, ${userState}</p>`;
            document.getElementById("weatherDisplay").appendChild(forecastIntro);

            // displaying the day of the week along with the weather
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
            var dayNum = null;
            var dayOfWeek = days[dayNum];

            // these are the segments of the 5-day forecast that are for noon each day
            let weatherForecasts = [3, 11, 19, 27, 35];

            // loop through our newly added train data and add it into our schedule table
            for (let segment of weatherForecasts) {
                let newWeatherColumn = document.createElement("div");
                newWeatherColumn.setAttribute("class", "col-2");
                // converting the unix date "dt" value to the day of the week 
                dayNum = new Date(response.list[segment].dt * 1000).getDay();
                dayOfWeek = days[dayNum];
                // grabbing the weather icon code, temperature (rounded to the nearest integer), and weather description
                // pulled weather icons from: https://openweathermap.org/weather-conditions to use in img tags
                weatherIcon = response.list[segment].weather[0].icon;
                temperature = Math.round(response.list[segment].main.temp);
                weatherDescription = response.list[segment].weather[0].description;
                // piecing the weather data together to be displayed in a column for each day of the forecast
                newWeatherColumn.innerHTML = `<p>${dayOfWeek}</p><p><img src=
                "https://openweathermap.org/img/w/${weatherIcon}.png"> ${temperature}°F ${weatherDescription}</p>`;
                document.getElementById("weatherDisplay").appendChild(newWeatherColumn);
            }

            // hide the city & state inputs & the original search button when we display these results
            // this is accomplished by hiding the entire row that contains them (added an id to it)          
            document.getElementById("homepageSearchRow").setAttribute("style", "display: none");
            // and displaying the New Search button
            document.getElementById("newSearchButton").removeAttribute("style");

            
        });
  
    const APIKEY2 = "AIzaSyDwS9kORdJagydPY9p50u2rkQdlt46d1WM"
    var queryURL2 = "https://www.googleapis.com/customsearch/v1?key=" + APIKEY2 +
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

      for (let i = 0; i < 5; i++) {
          let newEventRow = document.createElement("div");
          newEventRow.setAttribute("class", "row");
          let newEventColumn = document.createElement("div");
          newEventColumn.setAttribute("class", "col-4");
          newEventColumn.appendChild(newEventRow);
          var eventImage = response.items[i].pagemap.cse_thumbnail[0].src;
          console.log(eventImage);
          let columnTwo = document.createElement("div");
          columnTwo.setAttribute("class", "col-8");
          columnTwo.appendChild(newEventRow);
          var eventText = response.items[i].snippet;
          columnTwo.innerHTML = `<p>${eventText}</p>`;
          console.log(eventText);
          newEventColumn.innerHTML = `<img src="${eventImage}" alt="display"> <p>${columnTwo}</p>`;
          document.getElementById("eventsDisplay").appendChild(newEventColumn);
         
      }
      
    });
    // need to add an XHR request in case fetch is not supported
    /* XHR request needs to be tested by setting the if statement for the fetch request to "not supported"
    so it will default to the XHR request instead. this can be verified with a console.log within the
    XHR request, e.g. "XHR is running."
    */
});

// click event for New Search button
document.getElementById("newSearchButton").addEventListener("click", function(event) {
    // we prevent the default of refreshing the page when the form button is pressed  
    event.preventDefault();
    // TODO: clear out the event data
     document.getElementById("eventsDisplay").innerHTML = ""
    // clear out the weather data
    document.getElementById("weatherDisplay").innerHTML = "";
    // reset and show the homepage content again
    document.getElementById("inputCity").value = "";
    document.getElementById("inputState").value = "";
    document.getElementById("homepageSearchRow").removeAttribute("style");
    // hide the New Search button
    document.getElementById("newSearchButton").setAttribute("style", "display: none");
});

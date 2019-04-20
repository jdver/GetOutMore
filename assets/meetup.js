// JS for Get Out More - Project 1
'use strict'
// weather api
// This is Kris's API key for the weather (OpenWeatherMap)
const APIKEY = "e9cf524d552ebbdf618ed3daa5819d90";
// This is Jose's API key for Google API
const APIKEY2 = "AIzaSyDwS9kORdJagydPY9p50u2rkQdlt46d1WM"


var weatherDescription = "";
var weatherIcon = null;
var temperature = null;

document.getElementById("searchButton").addEventListener("click", function(event){
    // we prevent the default of refreshing the page when the form button is pressed  
    event.preventDefault();
    
    var userCity = document.getElementById("inputCity").value;
    var userState = document.getElementById("inputState").value;
    var weatherLocation = `${userCity},${userState}`;

    // here is the url for requesting a forecast for a given city (gives weather in 3-hour intervals)
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + weatherLocation + "&units=imperial&appid=" + APIKEY;
    // here is the url for requesting events for a given city
    var queryURL2 = "https://www.googleapis.com/customsearch/v1?key=" + APIKEY2 + "&cx=017456614146260198716:zjzb0jps8te&q=" + userCity + "+" + userState + "+events";

    // Here we run our AJAX call to the OpenWeatherMap API
    if (window.fetch) {
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

                // segments of the 5-day forecast, each 24 hours apart
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
    
    

        

        // Here we run our AJAX call to the Google API
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
    
    } else {
        // create new xhr object for the weather API
        const xhr = new XMLHttpRequest();
        // set an AJAX GET request using our queryURL
        xhr.open("GET", queryURL);
        // once the xhr loads, we want to...
        xhr.onload = event => {
            // check if the request to the weather API has finished...
            if (xhr.readyState === 4) {
                // check of the request has successfully retrieved data from the weather API
                if (xhr.status === 200) {
                    // parse our response into json so we can grab parts of it more easily
                    let response = JSON.parse(xhr.responseText);

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

                    // segments of the 5-day forecast, each 24 hours apart
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
                }
            }
        }
        // send the request to the weather API
        xhr.send();

        // create new xhr object for the Google API
        const xhr2 = new XMLHttpRequest();
        // set an AJAX GET request using our queryURL
        xhr2.open("GET", queryURL2);
        // once the xhr loads, we want to...
        xhr2.onload = event => {
            // check if the request to the Google API has finished...
            if (xhr2.readyState === 4) {
                // check of the request has successfully retrieved data from the Google API
                if (xhr2.status === 200) {
                    // parse our response into json so we can grab parts of it more easily
                    let response = JSON.parse(xhr2.responseText);

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
                }
            }
        }
        // send the request to the Google API
        xhr2.send();


        // hide the city & state inputs & the original search button when we display these results
                // this is accomplished by hiding the entire row that contains them (added an id to it)          
                document.getElementById("homepageSearchRow").setAttribute("style", "display: none");
                // and displaying the New Search button
                document.getElementById("newSearchButton").removeAttribute("style");
    }

});

// click event for New Search button
document.getElementById("newSearchButton").addEventListener("click", function(event) {
    // we prevent the default of refreshing the page when the form button is pressed  
    event.preventDefault();
    // clear out the event data
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

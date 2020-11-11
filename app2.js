"use strict";

function searchCurrent() {
    $('#current-weather-search').on('click', event => {
        event.preventDefault();
        let city = $('#current-weather').val();
        console.log(city);
        currentWeather(city);
    });
}

function currentWeather(city) {
    let currentURL = `https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&units=imperial`;
    console.log(currentURL);
    fetch(currentURL, {
	"headers": {
		"x-rapidapi-key": "2b8b09ddeamsh68aaebeff7640a2p14dbc8jsna48b4df442b7",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
})
.then(response => {
    if(response.ok) {
        return response.json();
    }   
})
.then(responseJson => {
    console.log(responseJson);
    displayCurrent(responseJson);
})
.catch(err => {
	console.error(err);
});
}

function displayCurrent(responseJson) {
    $('#target').empty();
    $('#target').append(`
    <div id="current-results">
        <p><h2>${responseJson.name}</h2></p>
        <p>The main temperature today is ${responseJson.main.temp}°.</p>
        <p>Feels like ${responseJson.main.feels_like}°.</p>
        <p>The low temp today is ${responseJson.main.temp_min}°.</p>
        <p>The high temp today is ${responseJson.main.temp_max}°.</p>
    </div>
    `)
    $('#results').removeClass('hidden')
}

function forecast() {
    $('#forecast-button').on('click', event => {
        event.preventDefault();
        let forecastCity = $('#forecast').val();
        console.log(forecastCity);
        getForecast(forecastCity);
    });
}

function getForecast(forecastCity) {
let forecastURL = `https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${forecastCity}&units=imperial`;
console.log(forecastURL);
fetch(forecastURL, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2b8b09ddeamsh68aaebeff7640a2p14dbc8jsna48b4df442b7",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}      
})
.then(response => {
	if(response.ok) {
        return response.json();
    }
})
.then(responseJson => {
    console.log(responseJson);
    displayForecast(responseJson);

})
.catch(err => {
	console.error(err);
});
}

function displayForecast(responseJson) {
    $('#target').empty();
    let day = 1;
    let i = 0;
    for (let i = 0; i < responseJson.list.length; i++) {
    $('#target').append(`
        <div id="forecast-results">
            <p><h3>Day ${day}: </h3></p>
            <p>Daytime temp: ${responseJson.list[i].temp.day}°</p>
            <p>Low temp: ${responseJson.list[i].temp.min}°</p>
            <p>High temp: ${responseJson.list[i].temp.max}°</p>
            <p><h3>Feels like: </h3></p>
            <p>Day: ${responseJson.list[i].feels_like.day}°</p>
            <p>Night: ${responseJson.list[i].feels_like.night}°</p>
            <p>Evening: ${responseJson.list[i].feels_like.eve}°</p>
            <p>Morning: ${responseJson.list[i].feels_like.morn}°</p>
        </div>
    `);
    day ++;
};
    $('#results').removeClass('hidden')
}



function handleApp() {
    searchCurrent();
    forecast();
}

handleApp();
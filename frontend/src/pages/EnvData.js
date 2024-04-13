// Function to get user's location
function getLocation() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchEnvironmentalData, showError);
} else {
    alert("Geolocation is not supported by this browser.");
}
}

// Error callback for geolocation's `getCurrentPosition`
function showError(error) {
switch(error.code) {
    case error.PERMISSION_DENIED:
    alert("User denied the request for Geolocation.");
    break;
    case error.POSITION_UNAVAILABLE:
    alert("Location information is unavailable.");
    break;
    case error.TIMEOUT:
    alert("The request to get user location timed out.");
    break;
    case error.UNKNOWN_ERROR:
    alert("An unknown error occurred.");
    break;
}
}

// Function to fetch environmental data using OpenWeather API

function fetchEnvironmentalData(position) {
const lat = position.coords.latitude;
const lon = position.coords.longitude;
const apiKey = 'facdf0f49dc3a5b99ecac65c11397ca0';
const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
    const environmentalData = {
        co2: "Not provided by API", // OpenWeather does not provide CO2
        no2: data.current.aqi, // Assuming 'no2' is part of the current object
        uvIndex: data.current.uvi,
        humidity: data.current.humidity,
        tempAvg: data.current.temp,
        // Assuming noise level is not provided by the OpenWeather API
        noiseLevelAvg: "Not provided by API",
        cloudCoverage: data.current.clouds,
        precipitationChance: data.minutely[0].precipitation // Assuming precipitation chance in the next minute
    };
    updateEnvironmentalCard(environmentalData);
    })
    .catch(error => {
    console.error('Error fetching environmental data: ', error);
    });
}


// Function to update the environmental data card with fetched data
function updateEnvironmentalCard(data) {
// Map the data from the API to the respective elements
    document.querySelector('.data-item .data-value.aqi').textContent = `${data.current.aqi} ppm`;
    document.querySelector('.data-item .data-value.uvi').textContent = `${data.current.uvi} ppm`;
    document.querySelector('.data-item .data-value.humidity').textContent = `${data.current.humidity} ppm`;
    document.querySelector('.data-item .data-value.temp').textContent = `${data.current.temp} ppm`;

// Repeat for other values like NO2, UV index etc.
// Note: You may need to modify the paths depending on the actual structure of the API response
}

// Call getLocation to trigger the whole process
getLocation();

// Set an interval to update data every 30 minutes
setInterval(getLocation, 1800000);
    
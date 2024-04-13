// WeatherData.js

// Function to calculate the UV Index based on cloud coverage
function calculateUVIndex(cloudCoverage) {
const hours = new Date().getHours();
const maxUVIndex = 11;

// Adjust the hours to reflect the sinusoidal nature of the UV index (peaks at solar noon)
let adjustedHours = (hours + 18) % 24; // Adjust by adding 18 hours to shift the peak to solar noon
let uvIndex = maxUVIndex * Math.sin((adjustedHours / 24) * Math.PI);

// Adjust the UV index based on cloud coverage (greater the cloud coverage, lower the UV index)
uvIndex *= (1 - (cloudCoverage / 100));

// Ensure the UV index is not negative and round to 2 decimal places
return Math.max(0, uvIndex.toFixed(2));
}


// Helper function to get real-life hour-based modifiers
// Function to generate random variations based on real-life time
function generateVariations() {
const currentHour = new Date().getHours();
const isDayTime = currentHour > 6 && currentHour < 18;

// Generate temperature variations based on time of day
const tempVariation = isDayTime ? Math.random() * 5 : Math.random() * -5;

// Generate variations for other parameters
const pressureVariation = Math.random() * 5;
const humidityVariation = Math.random() * 30;
const cloudCoverageVariation = Math.random() * 10;

return { tempVariation, pressureVariation, humidityVariation, cloudCoverageVariation };
}

// Function to update weather data for the current time
function updateCurrentWeatherData(baseTemperature, basePressure, baseHumidity, baseCloudCoverage) {
const { tempVariation, pressureVariation, humidityVariation, cloudCoverageVariation } = generateVariations();

// Apply the variations to the base weather values
const temperature = (baseTemperature + tempVariation).toFixed(2) + ' °C';
const pressure = (basePressure + pressureVariation).toFixed(2) + ' mBar';
const humidity = (baseHumidity + humidityVariation).toFixed(2) + '%';
const cloudCoverage = (baseCloudCoverage + cloudCoverageVariation).toFixed(2) + '%';
const O3 = (Math.random() * (20 - 18) + 18).toFixed(2) + ' ppB';
const NO2 = (Math.random() * (62 - 55) + 55).toFixed(2) + ' ppM';
const precipitationChance = (Math.random() * (25 - 10) + 10).toFixed(2) + ' %';
const windSpeed = (Math.random() * (8 - 5) + 5).toFixed(2) + ' km/h';
// Calculate the UV index using the cloud coverage value
const uvIndex = calculateUVIndex(cloudCoverage);

// Update the DOM with the new weather data
document.getElementById('temperature').querySelector('.data-value').textContent = temperature;
document.getElementById('pressure').querySelector('.data-value').textContent = pressure;
document.getElementById('humidity').querySelector('.data-value').textContent = humidity;
document.getElementById('cloudCov').querySelector('.data-value').textContent = cloudCoverage;
document.getElementById('O3').querySelector('.data-value').textContent = O3;
document.getElementById('NO2').querySelector('.data-value').textContent = NO2;
document.getElementById('precipitation').querySelector('.data-value').textContent = precipitationChance;
document.getElementById('uvIndex').querySelector('.data-value').textContent = uvIndex;
document.getElementById('windSpeed').querySelector('.data-value').textContent = windSpeed;
}

function updateFutureWeatherData(baseTemperature, basePressure, baseHumidity, baseCloudCoverage) {
for (let i = 1; i <= 6; i++) {
    const variations = generateVariations();

    // Calculate future weather data based on current data and variations
    const futureTemp = (baseTemperature + i * variations.tempVariation).toFixed(2) + ' °C';
    const futurePressure = (basePressure + i * variations.pressureVariation).toFixed(2) + ' mBar';
    const futureHumidity = (baseHumidity + i * variations.humidityVariation).toFixed(2) + '%';
    const futureCloudCov = (baseCloudCoverage + i * variations.cloudCoverageVariation).toFixed(2) + '%';

    // Update DOM elements for future weather predictions
    document.getElementById(`future${i}`).querySelectorAll('.data-value')[0].textContent = `Temp ${futureTemp}`;
    document.getElementById(`future${i}`).querySelectorAll('.data-value')[1].textContent = `Pressure ${futurePressure}`;
    document.getElementById(`future${i}`).querySelectorAll('.data-value')[2].textContent = `Cloud Coverage ${futureCloudCov}`;
    document.getElementById(`future${i}`).querySelectorAll('.data-value')[3].textContent = `Humidity ${futureHumidity}`;
}
}

// Base values for the weather data
const baseTemperature = 22; // Base temperature for predictions
const basePressure = 990; // Base pressure in mBar
const baseHumidity = 50; // Base humidity in %
const baseCloudCoverage = 40; // Base cloud coverage in %

// Initial call and interval setup to update weather data
function initializeWeatherUpdates() {
updateCurrentWeatherData(baseTemperature, basePressure, baseHumidity, baseCloudCoverage);
updateFutureWeatherData(baseTemperature, basePressure, baseHumidity, baseCloudCoverage);
}

// Refresh the data every 30 minutes
initializeWeatherUpdates();
setInterval(initializeWeatherUpdates, 1800000); 
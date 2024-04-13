

// Add event listener for DOMContentLoaded to ensure the HTML is fully loaded before manipulating it
document.addEventListener('DOMContentLoaded', function () {
// Function to simulate fetching weather alert data
function fetchWeatherAlerts() {
    // Simulate mock data
    const mockAlerts = [
    { type: 'Flooding', severity: 'High', description: 'Persistent and heavy rains are expected to swell rivers and overwhelm drainage systems, leading to potential flood conditions in low-lying and flood-prone areas. Take precautionary measures.' },
    { type: 'Tornado', severity: 'High', description: 'Conditions are ripe for the development of tornadoes in the area, with high wind speeds and severe thunderstorms forecasted. Seek shelter in a secure location immediately.' },
    { type: 'Hurricane', severity: 'High', description: 'A hurricane is approaching, characterized by extremely high wind speeds and heavy rainfall. Mandatory evacuations may be in order, and residents should secure properties and follow safety instructions from authorities.' },
    { type: 'Hail Storm', severity: 'Medium', description: 'Conditions are conducive to the formation of hail. Damage to vehicles, crops, and exposed surfaces is possible. It`s advised to stay indoors until the storm passes.' },
    { type: 'Snow Storm', severity: 'Medium', description: 'Heavy snowfall accompanied by strong winds could lead to blizzard conditions, affecting visibility and transportation. Significant accumulations may disrupt utilities and services.' },
    { type: 'Heat Wave', severity: 'Medium', description: 'Temperatures are expected to rise significantly above average, leading to high heat index values. Stay hydrated and avoid prolonged exposure to the sun.' },
    { type: 'Cold Wave', severity: 'Medium', description: 'A drastic drop in temperatures is anticipated, bringing the risk of hypothermia and frostbite. Ensure adequate heating and check on vulnerable individuals.' },
    { type: 'Torential Rain', severity: 'Low', description: 'Intense downpour is expected, which could cause flash floods and disrupt transportation. Keep an eye on weather updates and drainage systems.' },
    { type: 'Lightning Storm', severity: 'Low', description: 'Frequent lightning is expected to accompany thunderstorms. Stay clear of open fields and tall structures, and avoid using electrical appliances.' },
];

    // Call the function to display weather alerts on the page
    displayWeatherAlerts(mockAlerts);
}

// Function to dynamically create and append alert items to the list
function displayWeatherAlerts(alerts) {
    const alertList = document.getElementById('alert-list');
    alertList.innerHTML = ''; // Clear existing alerts

    // Loop through each alert and create list items
    alerts.forEach(alert => {
    const listItem = createAlertListItem(alert);
    alertList.appendChild(listItem);
    });
}

// Function to create an alert list item element
function createAlertListItem(alert) {
const listItem = document.createElement('li');

// Add class based on severity
let severityClass = '';
switch (alert.severity) {
    case 'High':
    severityClass = 'high-severity';
    break;
    case 'Medium':
    severityClass = 'medium-severity';
    break;
    case 'Low':
    severityClass = 'low-severity';
    break;
}

listItem.classList.add(severityClass);
listItem.innerHTML = `
    <strong>${alert.type}</strong> - ${alert.description}
`;

return listItem;
}

// Initial call to populate the alerts on page load
fetchWeatherAlerts();

// Set an interval to refresh the alerts periodically (Optional)
setInterval(fetchWeatherAlerts, 300000); // Refresh every 5 minutes
});

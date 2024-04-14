document.addEventListener('DOMContentLoaded', function () {
    initMap(); // Initialize the map and congestion check when the document is loaded
});

function buildApiUrl(point) {
    const baseURL = 'https://api.tomtom.com';
    const versionNumber = '4';
    const style = 'absolute';
    const zoom = '10';
    const format = 'json';
    const apiKey = 'tcGE6aOGet0PG5FSOOpmTOhfRL52doTk';
    const unit = 'KMPH';
    const thickness = '1';
    const openLr = 'false';
    const jsonp = 'false';

    return `${baseURL}/traffic/services/${versionNumber}/flowSegmentData/${style}/${zoom}/${format}?key=${apiKey}&point=${point}&unit=${unit}&thickness=${thickness}&openLr=${openLr}&jsonp=${jsonp}`;
}

function generateCirclePoints(center, radius, count) {
    const points = [];
    const lat = center.lat;
    const lng = center.lng;

    for (let i = 0; i < count; i++) {
        const angle = (i / count) * (2 * Math.PI); // angle in radians
        const dx = radius * Math.cos(angle) / 111.32; // converting degrees latitude per km
        const dy = radius * Math.sin(angle) / (111.32 * Math.cos(lat * Math.PI / 180)); // adjusting for longitude
        points.push({ lat: lat + dx, lng: lng + dy });
    }

    return points;
}

async function fetchTrafficData(point) {
    const url = buildApiUrl(point);

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching traffic data:', error);
        return null;
    }
}

function calculateCongestion(data) {
    if (!data || !data.flowSegmentData) {
        return 'No data available';
    }

    const speed = data.flowSegmentData.currentSpeed;
    const freeFlowSpeed = data.flowSegmentData.freeFlowSpeed;

    const congestionPercentage = ((freeFlowSpeed - speed) / freeFlowSpeed) * 100;

    if (congestionPercentage > 50) {
        return 'High Congestion';
    } else if (congestionPercentage > 20) {
        return 'Medium Congestion';
    } else {
        return 'Low Congestion';
    }
}

async function getCongestionLevel(center) {
    // Declare congestionDiv once at the top of the function
    const congestionDiv = document.getElementById('congestion-level');
    // Initialize with loading state
    if (congestionDiv) {
        congestionDiv.innerHTML = `<div class="loading">Loading congestion data...</div>`;
    }

    const points = generateCirclePoints(center, 5, 12); // Generate 12 points in a 5 km radius
    let sumPercentage = 0;
    let sumSpeed = 0;
    let validDataCount = 0;
    let maxCongestion = 0;
    let mostCongestedPoint = null;

    for (const point of points) {
        const trafficData = await fetchTrafficData(`${point.lat},${point.lng}`);
        console.log(trafficData); // Check what the API returned
        if (trafficData && trafficData.flowSegmentData) {
            const speed = trafficData.flowSegmentData.currentSpeed;
            const freeFlowSpeed = trafficData.flowSegmentData.freeFlowSpeed;
            const congestionPercentage = ((freeFlowSpeed - speed) / freeFlowSpeed) * 100;

            if (congestionPercentage > maxCongestion) {
                maxCongestion = congestionPercentage;
                mostCongestedPoint = point;
            }

            sumPercentage += congestionPercentage;
            sumSpeed += speed;
            validDataCount++;
            console.log(`Congestion at point ${point.lat.toFixed(3)},${point.lng.toFixed(3)}: ${congestionPercentage}%`);
        }
    }

    const averageCongestion = validDataCount > 0 ? sumPercentage / validDataCount : 0;
    const averageSpeed = validDataCount > 0 ? sumSpeed / validDataCount : 0;
    const congestionLevel = averageCongestion > 50 ? 'High Congestion' : averageCongestion > 20 ? 'Medium Congestion' : 'Low Congestion';

    congestionDiv.innerHTML = `<div class="loading">Loading congestion data...</div>`;
    // Update the card only after all the data is fetched
    // Update the part in getCongestionLevel function where you set innerHTML for congestionDiv:
if (congestionDiv) {
    congestionDiv.innerHTML = `
        <div class="column">Average Congestion Level: ${congestionLevel}</div>
        <div class="column">Average Speed: ${averageSpeed.toFixed(2)} KMPH</div>
        <div class="column">Most Congested Point: ${mostCongestedPoint ? `${mostCongestedPoint.lat.toFixed(3)}, ${mostCongestedPoint.lng.toFixed(3)} (Congestion: ${maxCongestion.toFixed(2)}%)` : 'Not available'}</div>
    `;
}

    
}





function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: userLocation
            });

            const trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);

            await getCongestionLevel(userLocation); // Fetch and display average congestion level

        }, function() {
            handleLocationError(true, null);
        });
    } else {
        handleLocationError(false, null);
    }
}


function handleLocationError(browserHasGeolocation, map) {
    const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // Default coordinates (New York)
    map = map || new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: defaultLocation
    });
    map.setCenter(defaultLocation);

    const errorInfo = browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.';
    alert(errorInfo);
}

function initMap() {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // Get the coordinates from the geolocation API
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Create a new map centered at the user's location
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: userLocation
            });

            // Add a traffic layer to the map
            const trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);

        }, function() {
            // Handle error or user denial for location access
            handleLocationError(true, map);
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, null);
    }
}

function handleLocationError(browserHasGeolocation, map) {
    const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // Default coordinates (e.g., New York)
    if (map === null) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: defaultLocation
        });
    }
    map.setCenter(defaultLocation);

    const errorInfo = browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.';
    alert(errorInfo);
}

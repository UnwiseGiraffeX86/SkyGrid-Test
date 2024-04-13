
// Ensure the initTrafficMap function is called when the window loads
window.onload = initTrafficMap;

// Initialize the TomTom map with traffic data
function initTrafficMap() {
    var map = tt.map({
        key: 'tcGE6aOGet0PG5FSOOpmTOhfRL52doTk', // Replace with your actual TomTom API key
        container: 'map',
        style: 'tomtom://vector/1/basic-main',
        center: [-74.0060, 40.7128], // Example: Center on New York City
        zoom: 12 // Adjust the zoom level as needed
    });

    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());

    // Add a layer for the traffic flow
    var trafficLayer = new tt.TrafficFlowLayer({
        key: 'tcGE6aOGet0PG5FSOOpmTOhfRL52doTk',
        style: 'absolute',
        refresh: 30 // Optional: specify how often the traffic information should be updated in seconds
    });
    
    map.addLayer(trafficLayer);
    
}

// Ensure the initTrafficMap function is called when the window loads
window.onload = initTrafficMap;
document.addEventListener('DOMContentLoaded', function() {
    initTrafficMap();
});

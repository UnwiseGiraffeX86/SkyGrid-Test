function initMap() {
    const mapCenter = { lat: 40.7128, lng: -74.0060 }; // Example coordinates, adjust as necessary

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: mapCenter
    });

    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
}

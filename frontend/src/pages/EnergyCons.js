// EnergyCons.js
document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('energyConsumptionChart').getContext('2d');
    
    // Simulated hourly energy consumption data for a 2.5 million people city
    var energyData = {
        labels: Array.from({length: 24}, (_, i) => i + ':00'), // Hour labels from 0:00 to 23:00
        datasets: [{
            label: 'Energy Consumption (MWh)',
            data: [
                1600, 1450, 1300, 1250, 1300, 1400, 1500, 1600, 1750, 1900, 
                2050, 2150, 2200, 2250, 2300, 2400, 2500, 2600, 2700, 2800, 
                2900, 2800, 2500, 2300
            ],
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            fill: true
        }]
    };

    // Configuration options for the chart
    var config = {
        type: 'line',
        data: energyData,
        options: {
            responsive: false, // Disable responsiveness
            maintainAspectRatio: false,
        }
    };

    // Create the chart
    var energyChart = new Chart(ctx, config);
});

document.addEventListener('DOMContentLoaded', function () {
    // Function to simulate fetching traffic alert data
    function fetchTrafficAlerts() {
        const mockAlerts = [
            { type: 'Accident', severity: 'High', description: 'Major accident on Highway 401. Multiple lanes blocked. Expect significant delays.' },
            { type: 'Roadwork', severity: 'Medium', description: 'Construction on Main St. causing partial road closures. Use alternative routes if possible.' },
            { type: 'Closure', severity: 'Medium', description: 'Bridge closure on River Rd due to maintenance. Please follow detour signs.' },
            { type: 'Congestion', severity: 'Low', description: 'Increased traffic volume downtown ahead of the sports event tonight. Allow extra travel time.' },
            { type: 'Disabled Vehicle', severity: 'High', description: 'Broken-down vehicle on the left shoulder of I-95 Northbound near exit 22. Proceed with caution.' },
            { type: 'Broken Light', severity: 'High', description: 'Broken-down vehicle on the left shoulder of I-95 Northbound near exit 22. Proceed with caution.' },
            { type: 'Pothole', severity: 'Medium', description: 'Broken-down vehicle on the left shoulder of I-95 Northbound near exit 22. Proceed with caution.' }
        ];

        // Call the function to display traffic alerts on the page
        displayTrafficAlerts(mockAlerts);
    }

    // Function to dynamically create and append alert items to the traffic list
    function displayTrafficAlerts(alerts) {
        const alertList = document.getElementById('traffic-alert-list');
        alertList.innerHTML = ''; // Clear existing alerts

        // Loop through each alert and create list items
        alerts.forEach(alert => {
            const listItem = createTrafficAlertListItem(alert);
            alertList.appendChild(listItem);
        });
    }

    // Function to create a traffic alert list item element
    function createTrafficAlertListItem(alert) {
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
    fetchTrafficAlerts();

    // Set an interval to refresh the alerts periodically (Optional)
    setInterval(fetchTrafficAlerts, 300000); // Refresh every 5 minutes
});

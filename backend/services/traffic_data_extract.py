import requests
import json

def fetch_traffic_data(api_key, lat, lon, radius):
    url = f"https://api.tomtom.com/traffic/services/5/incidentDetails"
    params = {
        'key': api_key,
        'bbox': f'{lat-radius},{lon-radius},{lat+radius},{lon+radius}',  # Define bounding box
        'language': 'en-US',
        'trafficModelID': '5',  # Example model ID
        'format': 'json'
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching traffic data: {response.status_code}")
        return None

def save_to_json(data, filename):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

# Replace 'YOUR_API_KEY' with your actual TomTom API key
api_key = 'tcGE6aOGet0PG5FSOOpmTOhfRL52doTk'
latitude = 40.7128  # New York City latitude
longitude = -74.0060  # New York City longitude
radius = 0.1  # Approx radius in degrees, adjust as necessary

traffic_data = fetch_traffic_data(api_key, latitude, longitude, radius)
if traffic_data:
    save_to_json(traffic_data, 'tomtom_traffic_data.json')
    print("Traffic data saved to 'tomtom_traffic_data.json'.")
else:
    print("Failed to fetch traffic data.")

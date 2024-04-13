import requests
import json
from datetime import datetime, timedelta
import time

# Your OpenWeather API key
api_key = 'f0f52cfca13ead9f53afe44c94451a15'

# Function to get environmental data
def get_environmental_data(lat, lon):
    # URLs for the OpenWeather API
    air_pollution_url = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={api_key}'
    weather_url = f'http://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly,daily&appid={api_key}'

    # Make the API calls
    air_pollution_response = requests.get(air_pollution_url)
    weather_response = requests.get(weather_url)
    
    # Check if the calls were successful
    if air_pollution_response.status_code == 200 and weather_response.status_code == 200:
        # Parse the responses as JSON
        air_pollution_data = air_pollution_response.json()
        weather_data = weather_response.json()
        
        # Extract the necessary information
        environmental_data = {
            'CO': air_pollution_data['list'][0]['components']['co'],
            'NO2': air_pollution_data['list'][0]['components']['no2'],
            'UV Index': weather_data['current']['uvi'],
            'Humidity': weather_data['current']['humidity'],
            'Temperature': weather_data['current']['temp'],
            # Other data points can be added here as needed
        }
        
        return environmental_data
    else:
        print("Failed to retrieve data")
        return {}

# Function to get user's location from their IP
def get_user_location():
    # Make a request to the IP Geolocation API
    response = requests.get('http://ipinfo.io/json?token=342ec5828a0eb5')
    location_data = response.json()
    loc = location_data['loc'].split(',')
    return {'lat': float(loc[0]), 'lon': float(loc[1])}

# Main function to run the data retrieval and update loop
def main():
    # Get the user's location
    user_location = get_user_location()
    
    # Get environmental data
    environmental_data = get_environmental_data(user_location['lat'], user_location['lon'])
    
    # Print the data
    print(json.dumps(environmental_data, indent=2))
    
    # Set an interval for updating the data
    update_interval = 30 * 60  # 30 minutes in seconds

    # Update loop
    while True:
        time.sleep(update_interval)
        environmental_data = get_environmental_data(user_location['lat'], user_location['lon'])
        print(json.dumps(environmental_data, indent=2))

# Run the script
if __name__ == "__main__":
    main()

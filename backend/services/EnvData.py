import requests
import json
from datetime import datetime, timedelta
import time

# Your OpenWeather API key
api_key = 'facdf0f49dc3a5b99ecac65c11397ca0'


# Function to get environmental data
def get_environmental_data(lat, lon):
    # URL for current air pollution data
    air_pollution_url = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={api_key}'
    
    # URL for weather data including UV index, humidity, etc.
    weather_url = f'http://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly,daily&appid={api_key}'
    
    # Make the API calls
    air_pollution_response = requests.get(air_pollution_url)
    weather_response = requests.get(weather_url)
    
    # Convert the response data to JSON
    air_pollution_data = air_pollution_response.json()
    weather_data = weather_response.json()
    
    # Extract the necessary data from the responses
    co = air_pollution_data['list'][0]['components']['co']
    no2 = air_pollution_data['list'][0]['components']['no2']
    uv_index = weather_data['current']['uvi']
    humidity = weather_data['current']['humidity']
    temperature = weather_data['current']['temp']
    noise_level = 'Data not available from API'  # Placeholder, as OpenWeather API does not provide noise level data
    cloud_coverage = weather_data['current']['clouds']
    precipitation_chance = 'Data not available from API'  # You would need to calculate this based on weather forecast data
    
    # Combine all data into a dictionary
    environmental_data = {
        'CO': co,
        'NO2': no2,
        'UV Index': uv_index,
        'Humidity': humidity,
        'Temperature': temperature,
        'Noise Level': noise_level,
        'Cloud Coverage': cloud_coverage,
        'Precipitation Chance': precipitation_chance
    }
    
    return environmental_data

# Function to get the user's location
def get_user_location():
    # Typically, you would use a geolocation API or the browser's geolocation API.
    # For the purpose of this example, let's use a fixed location:
    latitude = 40.7128  # New York City's latitude
    longitude = -74.0060  # New York City's longitude
    return latitude, longitude

# Get user's location
user_lat, user_lon = get_user_location()

# Run the function to get environmental data
data = get_environmental_data(user_lat, user_lon)

# Output the data
print(json.dumps(data, indent=2))

# Set an interval of 30 minutes before fetching new data
interval = timedelta(minutes=30)

# Use a loop to regularly update data
while True:
    data = get_environmental_data(user_lat, user_lon)
    print(json.dumps(data, indent=2))
    time.sleep(interval.total_seconds())

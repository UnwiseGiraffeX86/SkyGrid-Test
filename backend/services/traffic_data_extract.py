import requests
import json

import requests

def fetch_traffic_flow_data(api_key, bbox):
    url = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json"
    parameters = {
        'key': api_key,
        'bbox': bbox
    }
    response = requests.get(url, params=parameters)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch data: {response.status_code}, {response.text}")
        return None

def calculate_congestion_index(traffic_data):
    total_ratio = 0
    count = 0
    for segment in traffic_data.get("flowSegmentData", []):
        free_flow_speed = segment.get("freeFlowSpeed")
        current_speed = segment.get("currentSpeed")
        if free_flow_speed and current_speed and free_flow_speed > 0:
            ratio = current_speed / free_flow_speed
            total_ratio += ratio
            count += 1
    if count > 0:
        average_ratio = total_ratio / count
        return (1 - average_ratio) * 100  # Congestion index in percentage
    return 0

api_key = 'tcGE6aOGet0PG5FSOOpmTOhfRL52doTk'
bbox = '25.9773,44.3771,26.2047,44.5014'  # Adjusted order to SW to NE
traffic_data = fetch_traffic_flow_data(api_key, bbox)

if traffic_data:
    index = calculate_congestion_index(traffic_data)
    print(f"Traffic Congestion Index: {index:.2f}%")
else:
    print("No traffic data available.")

import json
import os

# -----------------------
# 1. Create output folder
# -----------------------
output_dir = "data"
os.makedirs(output_dir, exist_ok=True)


# -----------------------
# 2. Create sample aircraft sensor dataset
# -----------------------
aircraft_data = [
    {
        "aircraft_id": "A320-001",
        "engine_temp": 615,
        "vibration_level": 3.1,
        "oil_pressure": 42,
        "flight_hours": 1870,
        "fault_code": None
    },
    {
        "aircraft_id": "A320-002",
        "engine_temp": 699,
        "vibration_level": 6.8,
        "oil_pressure": 33,
        "flight_hours": 2500,
        "fault_code": "ENG-OVERHEAT"
    },
    {
        "aircraft_id": "B737-101",
        "engine_temp": 580,
        "vibration_level": 2.5,
        "oil_pressure": 48,
        "flight_hours": 1650,
        "fault_code": None
    }
]


# -----------------------
# 3. Write file to /data/
# -----------------------
output_file = os.path.join(output_dir, "aircraft_sample_data.json")

with open(output_file, "w") as f:
    json.dump(aircraft_data, f, indent=4)

print(f"✔ Data file created successfully: {output_file}")

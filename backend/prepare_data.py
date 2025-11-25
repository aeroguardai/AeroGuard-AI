import json

# Example aircraft telemetry data (small sample)
data = [
    {
        "timestamp": "2025-01-01T10:00:00Z",
        "engine_temp": 580,
        "oil_pressure": 42,
        "vibration": 0.9,
        "flight_hours": 1520,
        "anomaly": 0
    },
    {
        "timestamp": "2025-01-01T10:10:00Z",
        "engine_temp": 610,
        "oil_pressure": 39,
        "vibration": 1.8,
        "flight_hours": 1520.1,
        "anomaly": 1
    }
]

# Save prepared dataset
with open("prepared_dataset.json", "w") as f:
    json.dump(data, f, indent=4)

print("✔ prepared_dataset.json generated successfully!")


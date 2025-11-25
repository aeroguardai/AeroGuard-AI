import pandas as pd
import random
import datetime

# Create fake aircraft telemetry
data = []

for i in range(20):
    entry = {
        "timestamp": datetime.datetime.now() - datetime.timedelta(minutes=i*5),
        "engine_temp": random.randint(200, 700),
        "vibration": round(random.uniform(0.1, 5.0), 2),
        "fuel_flow": random.randint(400, 950),
        "pressure": random.randint(20, 60)
    }
    data.append(entry)

df = pd.DataFrame(data)
df.to_csv("sample_aircraft_data.csv", index=False)

print("Sample data created: sample_aircraft_data.csv")


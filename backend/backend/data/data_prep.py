import pandas as pd
import numpy as np

# ---------------------------
# 1. Load Raw Sample Data
# ---------------------------

df = pd.read_csv("sample_aircraft_data.csv")

# ---------------------------
# 2. Clean the data
# ---------------------------

# Remove missing values
df = df.dropna()

# Remove unrealistic sensor values
df = df[(df["engine_temp"] > 0) & (df["engine_temp"] < 1500)]
df = df[(df["vibration"] >= 0) & (df["vibration"] < 100)]

# Convert timestamps
df["timestamp"] = pd.to_datetime(df["timestamp"])

# ---------------------------
# 3. Feature Engineering
# ---------------------------

df["temp_rise_rate"] = df["engine_temp"].diff()
df["vibration_change"] = df["vibration"].diff()

df = df.fillna(0)

# ---------------------------
# 4. Save processed data
# ---------------------------

df.to_csv("processed_aircraft_data.csv", index=False)

print("Data cleaned and processed! Saved to processed_aircraft_data.csv")

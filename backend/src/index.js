import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());

// ROUTES
import chatRoutes from "./routes/chat.routes.js";
import anomalyRoutes from "./routes/anomaly.routes.js";
import telemetryRoutes from "./routes/telemetry.routes.js";
import monitorRoutes from "./routes/monitor.routes.js";

// DEFAULT
app.get("/", (req, res) => {
  res.send("AeroGuard AI Backend is running");
});

// API ROUTERS
app.use("/api", chatRoutes);
app.use("/api/anomaly", anomalyRoutes);
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/monitor", monitorRoutes);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

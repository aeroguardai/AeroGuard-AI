import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL
}));
app.use(express.json());

// Routes
import chatRoutes from "./routes/chat.routes.js";
import anomalyRoutes from "./routes/anomaly.routes.js";
import telemetryRoutes from "./routes/telemetry.routes.js";

// Default route
app.get("/", (req, res) => {
  res.send("AeroGuard AI Backend is running");
});

// Registered API routes
app.use("/api", chatRoutes);
app.use("/api/anomaly", anomalyRoutes);
app.use("/api/telemetry", telemetryRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ===============================
//  AeroGuard Backend – Final Index.js
// ===============================

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import chatRoutes from './routes/chat.routes.js';
import anomalyRoutes from './routes/anomaly.routes.js';
import telemetryRoutes from './routes/telemetry.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// -------------------------
// CORS
// -------------------------
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST"],
}));

app.use(express.json());

// -------------------------
// Default Route
// -------------------------
app.get('/', (req, res) => {
  res.send('AeroGuard AI Backend is running');
});

// -------------------------
// API Routes
// -------------------------
app.use('/api/chat', chatRoutes);
app.use('/api/anomaly', anomalyRoutes);
app.use('/api/telemetry', telemetryRoutes);

// -------------------------
// Start Server
// -------------------------
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

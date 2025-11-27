import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import chatRoutes from './routes/chat.routes.js';
import anomalyRoutes from './routes/anomaly.routes.js';
import telemetryRoutes from './routes/telemetry.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

// HEALTH CHECK
app.get('/', (req, res) => {
  res.send('AeroGuard AI Backend is running');
});

// ROUTES
app.use('/api', chatRoutes);
app.use('/api/anomaly', anomalyRoutes);
app.use('/api/telemetry', telemetryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

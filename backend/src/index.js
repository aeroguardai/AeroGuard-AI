import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Import Routes
import chatRoutes from './routes/chat.routes.js';
import anomalyRoutes from './routes/anomaly.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: process.env.FRONTEND_URL,
}));
app.use(express.json());

// Root test endpoint
app.get('/', (req, res) => {
  res.send('AeroGuard AI Backend is running');
});

// Chat route
app.use('/api', chatRoutes);

// Anomaly route
app.use('/api/anomaly', anomalyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

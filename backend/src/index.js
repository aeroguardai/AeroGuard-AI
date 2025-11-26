import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import chatRoutes from './routes/chat.routes.js';
import anomalyRoutes from './routes/anomaly.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: '*',
}));

app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('AeroGuard AI Backend is running');
});

// API routes
app.use('/api', chatRoutes);
app.use('/api/anomaly', anomalyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

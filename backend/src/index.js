import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// All routes must be imported at the top only
import chatRoutes from './routes/chat.routes.js';
import anomalyRoutes from './routes/anomaly.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

app.use(express.json());

// Default test route
app.get('/', (req, res) => {
  res.send('AeroGuard AI Backend is running');
});

// REGISTER ROUTES PROPERLY (after app is created)
app.use('/api', chatRoutes);
app.use('/api/anomaly', anomalyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from 'express';
import { askModel } from '../controllers/chat.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/chat', auth, askModel);

export default router;


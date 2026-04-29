import express from 'express';
import { createOvertime, getOvertimes  } from '../controllers/Overtime.js';

const router = express.Router()

router.post('/api/overtime' , createOvertime )
router.get('/api/overtime', getOvertimes);

export default router
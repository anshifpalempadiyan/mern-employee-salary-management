import express from 'express';
import { createOvertime } from '../controllers/Overtime.js';

const router = express.Router()

router.post('/api/overtime' , createOvertime )

export default router
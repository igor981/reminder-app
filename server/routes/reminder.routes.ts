import { Router } from 'express';
import { createReminder } from '../controllers/reminder.controller';

const router = Router();

router.post('/create-reminder', createReminder);

export default router;

import { Router } from 'express';
import { logIn, signUp } from '../controllers/auth.controller.js';
const router = Router();
router.post('/signup', signUp);
router.post('/login', logIn);
export default router;

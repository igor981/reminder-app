import { Router } from 'express';
import { logIn, signUp } from '../controllers/auth.controller';

const router = Router();

router.post('/test', (req, res) => res.send({ working: 'working' }));
router.post('/signup', signUp);
router.post('/login', logIn);

export default router;

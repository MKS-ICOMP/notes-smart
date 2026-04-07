import { Router } from 'express';
import authRouter from '../resources/auth/auth.router';
import noteRouter from '../resources/note/note.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/notes', noteRouter);

router.get('/health', (_req, res) => {
  res.json({ status: 'API v1 rodando perfeitamente!' });
});

export default router;

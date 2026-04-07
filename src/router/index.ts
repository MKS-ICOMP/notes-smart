import { Router } from 'express';
import v1Router from './v1Router';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'SmartNotes API' });
});

router.use('/v1', v1Router);

export default router;

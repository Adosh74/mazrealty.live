import { Router } from 'express';
import { protect } from '../../controllers/auth.controller';
import { addMessage } from '../../controllers/message.controller';

const router = Router();

// protect all message routes
router.use(protect);

router.post('/', addMessage);

export default router;

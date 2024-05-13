import { Router } from 'express';
import { protect } from '../../controllers/auth.controller';
import * as chatController from '../../controllers/chat.controller';

const router = Router();

// protect all routes
router.use(protect);

router.route('/').get(chatController.getMyChats).post(chatController.addChat);

router.patch('/read/:id', chatController.readChat);

router.route('/:id').get(chatController.getOneChat);

export default router;

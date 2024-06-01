import { Router } from 'express';
import * as authController from '../../controllers/auth.controller';
import * as lawyerController from '../../controllers/lawyer.controller';

const router = Router();

router.use(authController.protect, authController.restrictTo('lawyer', 'admin'));

router.get('/not-approved', lawyerController.getNotRespondedBookings);
router.patch('/approve-property/:bookingId', lawyerController.verifiedContract);
router.patch('/reject-property/:bookingId', lawyerController.invalidContract);

export default router;

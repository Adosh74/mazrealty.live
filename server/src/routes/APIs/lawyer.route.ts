import { Router } from 'express';
import * as authController from '../../controllers/auth.controller';
import * as lawyerController from '../../controllers/lawyer.controller';

const router = Router();

router.use(authController.protect, authController.restrictTo('lawyer', 'admin'));

router.get('/not-approved', lawyerController.getNotApproved);
router.patch('/approve-property/:propertyId', lawyerController.approveProperty);

export default router;

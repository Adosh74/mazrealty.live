import { Router } from 'express';
import * as adminController from '../../controllers/admin.controller';
import * as authController from '../../controllers/auth.controller';

const router = Router();

router.use(authController.protect, authController.restrictTo('admin'));

router.get('/approved-properties', adminController.getAllPropertiesApproved);

export default router;

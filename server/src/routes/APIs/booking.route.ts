import { Router } from 'express';
import * as authController from '../../controllers/auth.controller';
import * as bookingController from '../../controllers/booking.controller';

const router = Router();
router.get(
	'/checkout-session/:propertyId',
	authController.protect,
	bookingController.getCheckoutSession
);

router.get('/create-book', bookingController.createBookingCheckout);

export default router;

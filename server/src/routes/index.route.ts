import { Router } from 'express';
import adminRoutes from './APIs/admin.route';
import authRoutes from './APIs/auth.route';
import bookingRoute from './APIs/booking.route';
import chatRoutes from './APIs/chat.route';
import cityRoutes from './APIs/city.route';
import lawyerRoutes from './APIs/lawyer.route';
import messageRoutes from './APIs/message.route';
import propertyRoutes from './APIs/property.route';
import userRoutes from './APIs/user.route';
import userFavoriteRoutes from './APIs/userFavorite.route';

const routes = Router();

// *** Routes *** //

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/properties', propertyRoutes);
routes.use('/favorites', userFavoriteRoutes);
routes.use('/cities', cityRoutes);
routes.use('/lawyers', lawyerRoutes);
routes.use('/admin', adminRoutes);
routes.use('/chats', chatRoutes);
routes.use('/messages', messageRoutes);
routes.use('/bookings', bookingRoute);

export default routes;

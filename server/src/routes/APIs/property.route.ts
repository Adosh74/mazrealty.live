import { Router } from 'express';
import authCheck from '../../middleware/authCheck.middleware';
import upload from '../../middleware/upload.middleware';
import * as authController from './../../controllers/auth.controller';
import * as propertyController from './../../controllers/property.controller';

const routes = Router();

routes.use(authCheck);
routes
	.route('/')
	.get(propertyController.getAllProperty)
	.post(upload, authController.protect, propertyController.createOneProperty);

routes.post(
	'/create-property-ai',
	upload,
	authController.protect,
	propertyController.createPropertyWithDescription
);

routes.get('/my-properties', authController.protect, propertyController.getMyProperties);
routes.patch('/delete-image/:id', authController.protect, propertyController.deleteImage);
routes.patch(
	'/add-images/:id',
	upload,
	authController.protect,
	propertyController.addImages
);

routes
	.route('/:id')
	.get(propertyController.getOneProperty)
	.patch(authController.protect, propertyController.updateOneProperty)
	.delete(authController.protect, propertyController.deleteOneProperty);

export default routes;

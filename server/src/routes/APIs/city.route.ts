import { Router } from 'express';
import * as CityController from '../../controllers/city.controller';

const router = Router();

// *** CRUD operation for city

router.route('/').get(CityController.getAllCity).post(CityController.createOneCity);

router
	.route('/:id')
	.get(CityController.getOneCity)
	.patch(CityController.updateOneCity)
	.delete(CityController.deleteOneCity);

export default router;

import { Router } from 'express';
import * as authController from '../../controllers/auth.controller';
import * as userFavoriteController from '../../controllers/userFavorite.controller';

const router = Router();

router.use(authController.protect);

router.get('/', userFavoriteController.getFavorites);

router.post('/:propertyId', userFavoriteController.createFavorite);

router.delete('/:id', userFavoriteController.deleteFavorite);

export default router;

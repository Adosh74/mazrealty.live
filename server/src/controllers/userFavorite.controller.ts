import { Request, Response, NextFunction } from 'express';
import Property from '../models/property.model';
import UserFavorite from '../models/userFavorite.model';
import AppError from '../utils/AppError.util';
import catchAsync from '../utils/catchAsync.util';

// *** createFavorite ***
export const createFavorite = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { propertyId } = req.params;
		const userId = (req as any).user._id;

		// +[1] check if property exists
		const property = await Property.findById(propertyId);

		if (!property) {
			return next(new AppError('Property not found', 404));
		}
		// +[2] check if user has already favorited the property
		const favorite = await UserFavorite.findOne({
			user: userId,
			property: propertyId,
		});

		if (favorite) {
			return next(new AppError('Property already favorited', 400));
		}

		// +[3] create favorite
		const newFavorite = await UserFavorite.create({
			user: userId,
			property: propertyId,
		});

		res.status(201).json({
			status: 'success',
			data: {
				favorite: newFavorite,
			},
		});
	}
);

// *** get all user favorites and populate property ***
export const getFavorites = catchAsync(async (req: Request, res: Response) => {
	const userId = (req as any).user._id;

	const favorites = await UserFavorite.findUserFavorites(userId);

	res.status(200).json({
		status: 'success',
		results: favorites.length,
		data: {
			favorites,
		},
	});
});

// *** deleteFavorite ***
export const deleteFavorite = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const userId = (req as any).user._id;

		// +[1] check if user has favorited the property
		const favorite = await UserFavorite.findById(id);

		if (!favorite) {
			return next(new AppError('Favorite not found', 404));
		}

		if (favorite.user.toString() !== userId.toString()) {
			return next(new AppError('Unauthorized', 401));
		}

		// +[2] delete favorite
		await UserFavorite.findByIdAndDelete(id);

		res.status(204).json({
			status: 'success',
			data: null,
		});
	}
);

/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import UserFavorite from '../models/userFavorite.model';

const isPropertySaved = async (
	req: Request,
	res: Response,
	propertyId: string
): Promise<boolean> => {
	// +[7] check if user saved the property
	const isSaved = await UserFavorite.findOne({
		user: (req as any).user._id,
		property: propertyId,
	});

	if (!isSaved) return false;

	return true;
};

export default isPropertySaved;

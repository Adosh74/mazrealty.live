import { NextFunction, Request, Response } from 'express';
import ApprovedProp from '../models/approvedProp.model';
import Property from '../models/property.model';
import AppError from '../utils/AppError.util';
import catchAsync from '../utils/catchAsync.util';

export const getNotApproved = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const propertyNotApproved = await Property.find({ approved: false });

		res.status(200).json({
			status: 'success',
			result: propertyNotApproved.length,
			data: { propertyNotApproved },
		});
	}
);

export const approveProperty = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { propertyId } = req.params;

		const property = await Property.findByIdAndUpdate(
			propertyId,
			{ approved: true },
			{ new: true }
		);

		if (!property) {
			return next(new AppError('Property not found', 404));
		}

		await ApprovedProp.create({
			lawyer: (req as any).user._id,
			// eslint-disable-next-line prettier/prettier
			property: propertyId,
		});

		res.status(200).json({
			status: 'success',
			data: { property },
		});
	}
);

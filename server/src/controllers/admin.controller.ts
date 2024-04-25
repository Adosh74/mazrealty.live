import { NextFunction, Request, Response } from 'express';
import ApprovedProp from '../models/approvedProp.model';
import catchAsync from '../utils/catchAsync.util';

export const getAllPropertiesApproved = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const properties = await ApprovedProp.find();

		res.status(200).json({
			status: 'success',
			results: properties.length,
			data: {
				properties,
			},
		});
	}
);

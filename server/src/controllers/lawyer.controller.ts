import ejs from 'ejs';
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import ApprovedProp from '../models/approvedProp.model';
import Property from '../models/property.model';
import AppError from '../utils/AppError.util';
import catchAsync from '../utils/catchAsync.util';
import sendMail from '../utils/mail';

export const getNotApproved = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const propertyNotApproved = await Property.find({ approved: false });

		propertyNotApproved.forEach((property) => {
			property.contract = `${req.protocol}://${req.get('host')}/img/properties/${
				property.contract
			}`;
			property.images.forEach((img: any) => {
				if (!img.startsWith('https')) {
					property.images[property.images.indexOf(img)] = `${
						req.protocol
					}://${req.get('host')}/img/properties/${img}`;
				}
			});
		});

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

		// const data = {
		// 	user: { name: property.owner.name },
		// 	property: {
		// 		name: property.name,
		// 		type: property.type,
		// 		address: property.address,
		// 		price: property.price,
		// 	},
		// };

		// await ejs.renderFile(path.join(process.cwd(), 'src/mails/approved.ejs'), data);

		// await sendMail({
		// 	email: property.owner.email as string,
		// 	subject: 'Property Approved 🚀✔',
		// 	template: 'approved.ejs',
		// 	data,
		// });

		res.status(200).json({
			status: 'success',
			data: { property },
		});
	}
);

export const rejectProperty = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { propertyId } = req.params;

		const property = await Property.findByIdAndDelete(propertyId);

		if (!property) {
			return next(new AppError('Property not found', 404));
		}

		// const data = {
		// 	user: { name: property.owner.name },
		// 	property: {
		// 		name: property.name,
		// 		type: property.type,
		// 		address: property.address,
		// 		price: property.price,
		// 	},
		// };

		// await ejs.renderFile(path.join(process.cwd(), 'src/mails/reject.ejs'), data);

		// await sendMail({
		// 	email: property.owner.email as string,
		// 	subject: 'Property Rejected 🚫❌',
		// 	template: 'reject.ejs',
		// 	data,
		// });

		res.status(204).json({
			status: 'success',
			data: null,
		});
	}
);

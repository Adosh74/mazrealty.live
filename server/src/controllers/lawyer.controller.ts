import ejs from 'ejs';
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import Booking from '../models/booking.model';
import AppError from '../utils/AppError.util';
import catchAsync from '../utils/catchAsync.util';
import sendMail from '../utils/mail';

export const getNotRespondedBookings = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// get all booking that not responded
		const notRespondedBookings = (await Booking.find({ responded: false })
			.populate({
				path: 'property',
			})
			.sort({
				createdAt: 1,
			})) as any;

		// update images and contract url
		notRespondedBookings.forEach((booking: any, bookIndex: number) => {
			if (!booking.property.contract.startsWith('http')) {
				booking.property.contract = `${req.protocol}://${req.get(
					'host'
				)}/img/properties/${booking.property.contract}`;
			}

			booking.property.images.forEach((image: string, index: number) => {
				if (!image.startsWith('http')) {
					notRespondedBookings[bookIndex].property.images[index] = `${
						req.protocol
					}://${req.get('host')}/img/properties/${image}`;
				}
			});
		});

		res.status(200).json({
			status: 'success',
			result: notRespondedBookings.length,
			data: { notRespondedBookings },
		});
	}
);

export const verifiedContract = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { bookingId } = req.params;

		const booking = (await Booking.findById(bookingId)
			.populate({
				path: 'property',
			})
			.populate({
				path: 'user',
			})) as any;

		if (!booking) {
			return next(new AppError('Booking not found', 404));
		}

		booking.responded = true;
		await booking.save();

		const data = {
			user: { name: booking.user.name },
			property: {
				name: booking.property.name,
				type: booking.property.type,
				address: booking.property.address,
				price: booking.property.price,
				url: `https://mazrealty-live.onrender.com/property/${booking.property._id}`,
			},
		};

		await ejs.renderFile(path.join(__dirname, '../../mails/approved.ejs'), data);

		await sendMail({
			email: booking.user.email as string,
			subject: 'Property Contract is Verified ✔',
			template: 'approved.ejs',
			data,
		});

		res.status(200).json({
			status: 'success',
			data: { booking },
		});
	}
);

export const invalidContract = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { bookingId } = req.params;

		const booking = (await Booking.findById(bookingId)
			.populate({
				path: 'property',
			})
			.populate({
				path: 'user',
			})) as any;

		if (!booking) {
			return next(new AppError('Booking not found', 404));
		}

		booking.responded = true;
		await booking.save();

		const data = {
			user: { name: booking.user.name },
			property: {
				name: booking.property.name,
				type: booking.property.type,
				address: booking.property.address,
				price: booking.property.price,
				url: `https://mazrealty-live.onrender.com/property/${booking.property._id}`,
			},
		};

		await ejs.renderFile(path.join(__dirname, '../../mails/reject.ejs'), data);

		await sendMail({
			email: booking.user.email as string,
			subject: 'Property Contract is Invalid  🚫',
			template: 'reject.ejs',
			data,
		});

		res.status(200).json({
			status: 'success',
			data: { booking },
		});
	}
);

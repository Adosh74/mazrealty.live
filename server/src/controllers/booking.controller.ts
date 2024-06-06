/* eslint-disable prettier/prettier */
import ejs from 'ejs';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import path from 'path';
import Stripe from 'stripe';
import { LOGGER } from '../logging';
import Booking from '../models/booking.model';
import Property, { IPropertySchema } from '../models/property.model';
import User, { IUserSchema } from '../models/user.model';
import AppError from '../utils/AppError.util';
import catchAsync from '../utils/catchAsync.util';
import sendMail from '../utils/mail';

if (!process.env.STRIPE_SECRET_KEY) {
	LOGGER.error('No Stripe secret key found');
	process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getCheckoutSession = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// +[1] find property
		const property: IPropertySchema | null = await Property.findById(
			req.params.propertyId
		);

		// +[2] check if property not found
		if (!property) {
			return next(new AppError('No property found with that ID', 404));
		}

		property.images.forEach((image) => {
			if (!image.startsWith('https')) {
				image = `${req.protocol}://${req.get('host')}/img/properties/${image}`;
			}
		});

		// +[3] create checkout session
		// create successUrl that contain the propertyId and user token
		const token: string | undefined =
			req.headers.authorization && req.headers.authorization.startsWith('Bearer')
				? req.headers.authorization.split(' ')[1]
				: req.cookies.jwt;

		if (!token) {
			return next(
				new AppError('You are not logged in! Please log in to get access', 401)
			);
		}

		const successUrl = `${req.protocol}://${req.get(
			'host'
		)}/api/v1/bookings/create-book/?property=${req.params.propertyId}&token=${token}`;

		const session = await (stripe as any).checkout.sessions.create({
			mode: 'payment',
			payment_method_types: ['card'],
			success_url: successUrl,
			cancel_url: `${req.protocol}://${req.get('host')}/property/${
				req.params.propertyId
			}`,
			customer_email: (req as any).user.email,
			client_reference_id: req.params.propertyId,
			line_items: [
				{
					price_data: {
						currency: 'EGP',
						unit_amount: 500 * 100,

						product_data: {
							name: `${property.name} property`,
							description: 'Check the contract of the property',
							images: property.images,
						},
					},
					quantity: 1,
				},
			],
		});

		// +[4] send session to client
		res.status(200).json({
			status: 'success',
			session,
		});
	}
);

export const createBookingCheckout = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { property, token } = req.query;
		if (!property || !token) {
			return next(new AppError('There is no property or token', 400));
		}

		const propertyObj = await Property.findById(property);
		if (!propertyObj) {
			return next(new AppError('There is no property with this id', 404));
		}

		const promisify = (fn: any) => {
			return (...args: any) => {
				return new Promise((resolve, reject) => {
					fn(...args, (err: any, data: any) => {
						if (err) return reject(err);
						resolve(data);
					});
				});
			};
		};

		const decoded: any = (await promisify(jwt.verify)(
			token,
			process.env.JWT_SECRET
		)) as JwtPayload;

		const currentUser: IUserSchema | null = await User.findById(decoded.id);

		if (!currentUser) {
			return next(
				new AppError('The user belonging to this token does no longer exist', 401)
			);
		}

		await Booking.create({
			property: propertyObj._id,
			user: currentUser._id,
			price: 500,
		});

		const data = {
			user: { name: currentUser.name },
			property: {
				name: propertyObj.name,
				type: propertyObj.type,
				address: propertyObj.address,
				price: propertyObj.price,
			},
		};

		await ejs.renderFile(path.join(__dirname, '../../mails/request-check.ejs'), data);

		await sendMail({
			email: currentUser.email as string,
			subject: 'Check Property Contract 📝',
			template: 'request-check.ejs',
			data,
		});

		res.redirect(`${req.protocol}://${req.get('host')}/success-book`);
		// res.redirect(`https://mazrealty-live.onrender.com/`);
	}
);

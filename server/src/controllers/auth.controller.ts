// import crypto from 'crypto';
import ejs from 'ejs';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import path from 'path';
import { LOGGER } from '../logging';
import User, { IUserSchema } from '../models/user.model';
import AppError from '../utils/AppError.util';
import catchAsync from '../utils/catchAsync.util';
import sendMail from '../utils/mail';

// *** Sign JWT token
const signToken = (id: string, role: string) => {
	if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
		LOGGER.error('JWT_SECRET or JWT_EXPIRES_IN not found');
		process.exit(1);
	}
	return jwt.sign({ id, role }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

// *** Create and send token
const createSendToken = (user: IUserSchema, statusCode: number, res: Response) => {
	// +[1] Create JWT token
	const token = signToken(user._id, user.role);

	// +[2] Set cookie options
	if (!process.env.JWT_COOKIE_EXPIRES_IN) {
		LOGGER.error('JWT_COOKIE_EXPIRES_IN not found');
		process.exit(1);
	}
	const cookieOptions = {
		expires: new Date(
			Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	} as { expires: Date; httpOnly: boolean; secure?: boolean };

	// +[3] Secure cookie only in production
	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

	// +[4] set cookie
	res.cookie('jwt', token, cookieOptions);

	// +[5] Remove password from output
	user.password = '';

	// +[6] Send response
	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

// *** Signup
export const signup = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// +[1] Check if user already exists
		const existingUser = await User.findOne({ email: req.body.email });

		if (existingUser) {
			return next(new AppError('User already exists', 400));
		}

		// +[2] Create new user
		const newUser: IUserSchema = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
			whatsapp: req.body.whatsapp,
			phone: req.body.phone,
		});

		// +[3] prepare data that will be sent to the email template
		const data = { user: { name: newUser.name.split(' ')[0] } };

		// +[4] render email template
		await ejs.renderFile(path.join(__dirname, '../mails/welcome.ejs'), data);

		await sendMail({
			email: newUser.email,
			subject: 'Welcome to MAZ Realty!',
			template: 'welcome.ejs',
			data,
		});

		createSendToken(newUser, 201, res);
	}
);

// *** login
export const login = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		// +[1] Check if email and password exist
		if (!email || !password) {
			return next(new AppError('Please provide email and password', 400));
		}

		// +[2] Check if user exists && password is correct
		const user = await User.findOne({ email: email }).select('+password');

		if (!user || !(await user.correctPassword(password, user.password))) {
			return next(new AppError('Incorrect email or password', 401));
		}

		// +[3] Send token
		createSendToken(user, 200, res);
	}
);

// *** Protect routes
export const protect = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// +[1] Get token and check if it's there
		let token: string | undefined;
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			token = req.headers.authorization.split(' ')[1];
		} else if (req.cookies.jwt) {
			token = req.cookies.jwt;
		}

		// +[2] Check if token not exists
		if (!token) {
			return next(
				new AppError('You are not logged in! Please log in to get access', 401)
			);
		}

		// +[3] Verify token
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

		// +[4] Check if user still exists
		const currentUser: IUserSchema | null = await User.findById(decoded.id);

		// +[5] Check if user still exists
		if (!currentUser) {
			return next(
				new AppError('The user belonging to this token does no longer exist', 401)
			);
		}

		// +[6] Check if user changed password after the token was issued
		if (currentUser.passwordChangedAfter(decoded.iat)) {
			return next(
				new AppError('User recently changed password! Please log in again', 401)
			);
		}

		// +[7] Grant access to protected route
		(req as any).user = currentUser;

		next();
	}
);

// *** restrict to specific roles (middleware)
export const restrictTo =
	(...roles: string[]) =>
	(req: Request, res: Response, next: NextFunction) => {
		if (!roles.includes((req as any).user.role)) {
			return next(
				new AppError('You do not have permission to perform this action', 403)
			);
		}
		next();
	};

// *** update password
export const updatePassword = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// +[1] Get user info
		const user = await User.findById((req as any).user.id).select('+password');

		// +[2] Check if user exists
		if (!user) {
			return next(new AppError('User not found', 404));
		}

		// +[3] Check if posted password is correct
		if (!(await user?.correctPassword(req.body.passwordCurrent, user.password))) {
			return next(new AppError('Your current password is wrong', 401));
		}

		// +[4] Update password
		user.password = req.body.password;
		user.passwordConfirm = req.body.passwordConfirm;
		await user.save();

		// +[5] Log user in, send JWT
		createSendToken(user, 200, res);
	}
);

// *** logout
export const logout = (req: Request, res: Response) => {
	res.cookie('jwt', 'loggedout', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});

	res.status(200).json({ status: 'success' });
};

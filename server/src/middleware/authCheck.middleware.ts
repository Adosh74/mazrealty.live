// create function check if user auth put user data in req.user and next else next
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUserSchema } from '../models/user.model';
import catchAsync from '../utils/catchAsync.util';

const authCheck = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	let token: string | undefined;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	// +[2] Check if token not exists
	if (!token) {
		return next();
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
		return next();
	}

	// +[6] Check if user changed password after the token was issued
	if (currentUser.passwordChangedAfter(decoded.iat)) {
		return next();
	}

	// +[7] Put user data in req.user
	(req as any).user = currentUser;
	next();
});
export default authCheck;

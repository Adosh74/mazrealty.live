import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { LOGGER } from '../logging';
import Property from '../models/property.model';
import User from '../models/user.model';
import filterObj from '../utils/filterObj.util';
import * as Factory from './handlerFactory.controller';

// *** user CRUD operations

// +[1] getAllUsers - get all users
export const getAllUsers = Factory.getAll(User);
export const getOneUser = Factory.getOne(User);
export const createUser = Factory.createOne(User);
export const updateUser = Factory.updateOne(User);
export const deleteUser = Factory.deleteOne(User);

// *** getMe - get current user
export const getMe = (req: Request, res: Response, next: NextFunction) => {
	req.params.id = (req as any).user.id;
	next();
};

// *** updateMe - update current user
export const updateMe = async (req: Request, res: Response, next: NextFunction) => {
	// 1) Create error if user POSTs password data
	if (req.body.password || req.body.passwordConfirm) {
		return next({
			statusCode: 400,
			message:
				'This route is not for password updates. Please use /updateMyPassword.',
		});
	}

	// 2) Filtered out unwanted fields names that are not allowed to be updated
	const filteredBody = filterObj(req.body, 'name', 'email', 'phone', 'whatsapp');

	// 3) If user is trying to update email, check if the email is already taken
	if (req.body.email) {
		const user = await User.findOne({ email: req.body.email });
		if (user && user._id.toString() !== (req as any).user.id) {
			return next({
				statusCode: 400,
				message: 'Email already taken. Please use a different email.',
			});
		}
	}

	// 4) If user is trying to update photo, add the photo to the filteredBody
	if (req.file) filteredBody.photo = req.file.filename;

	const oldUserPhoto = await User.findById((req as any).user.id).select('photo');

	// 5) Update user document
	const updatedUser = await User.findByIdAndUpdate((req as any).user.id, filteredBody, {
		new: true,
		runValidators: true,
	});

	// check if user has property and update the owner info
	if (updatedUser)
		await Property.updateMany(
			{ 'owner._id': (req as any).user.id },
			{
				owner: {
					_id: updatedUser._id,
					name: updatedUser?.name,
					email: updatedUser?.email,
					phone: updatedUser?.phone,
					whatsapp: updatedUser?.whatsapp,
				},
			}
		);

	// 6) If user updated photo, delete the old photo
	if (req.file && oldUserPhoto && oldUserPhoto.photo !== 'default.jpg') {
		fs.unlink(`${process.cwd()}/public/img/users/${oldUserPhoto.photo}`, (err) => {
			if (err) {
				LOGGER.error(`Error deleting old user photo: ${err}`);
				return;
			}
		});
	}

	res.status(200).json({
		status: 'success',
		data: {
			user: updatedUser,
		},
	});
};

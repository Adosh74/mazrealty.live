import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Property, { IPropertySchema } from '../models/property.model';
import AppError from '../utils/AppError.util';
import catchAsync from '../utils/catchAsync.util';
import * as Factory from './handlerFactory.controller';

// *** CRUD operation for property

export const getAllProperty = Factory.getAll(Property, 'property');
export const getOneProperty = Factory.getOne(Property, 'owner', 'property');
// export const createOneProperty = Factory.createOne(Property);
export const createOneProperty = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// +[2] create property

		req.body.owner = { _id: (req as any).user.id };
		req.body.city = { _id: req.body.city };
		req.body.area = req.body.area * 1;
		req.body.price = req.body.price * 1;
		req.body.level ? (req.body.level = req.body.level * 1) : (req.body.level = 0);
		const property = await Property.create(req.body);

		// +[3] send response
		res.status(201).json({
			status: 'success',
			data: {
				property,
			},
		});
	}
);
export const updateOneProperty = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// +[1] find property
		const property: IPropertySchema | null = await Property.findById(req.params.id);

		// +[2] check if property exists
		if (!property) {
			return next(new AppError('No property found with that ID', 404));
		}

		// +[3] check if the user is the owner of the property or is an admin
		if (
			property?.owner._id.toString() !== (req as any).user.id &&
			(req as any).user.role !== 'admin'
		) {
			return next(new AppError('You are not allowed to update this property', 403));
		}

		// +[4] update property
		const updatedProperty = await Property.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		// +[5] send response
		res.status(200).json({
			status: 'success',
			data: {
				property: updatedProperty,
			},
		});
	}
);

export const deleteOneProperty = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// +[1] find property
		const property: IPropertySchema | null = await Property.findById(req.params.id);

		// +[2] check if property exists
		if (!property) {
			return next(new AppError('No property found with that ID', 404));
		}

		// +[3] check if the user is the owner of the property or is an admin
		if (
			property?.owner._id.toString() !== (req as any).user.id &&
			(req as any).user.role !== 'admin'
		) {
			return next(new AppError('You are not allowed to delete this property', 403));
		}

		// +[4] delete property
		await property.remove();

		// +[5] send responses
		res.status(204).json({
			status: 'success',
			data: null,
		});
	}
);

// *** My properties
export const getMyProperties = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = (req as any).user.id;
		const properties = await Property.find({ 'owner._id': userId });

		res.status(200).json({
			status: 'success',
			results: properties.length,
			data: {
				properties,
			},
		});
	}
);

// *** delete image from property
export const deleteImage = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const property: IPropertySchema | null = await Property.findById(
			req.params.id
		).select('+owner._id');

		if (!property) {
			return next(new AppError('No property found with that ID', 404));
		}

		if (
			property?.owner._id.toString() !== (req as any).user.id &&
			(req as any).user.role !== 'admin'
		) {
			return next(new AppError('You are not allowed to delete this property', 403));
		}

		const images = property.images.filter((image) => image !== req.body.image);

		// delete image from public/properties
		fs.unlinkSync(path.join(__dirname, `../../public/properties/${req.body.image}`));

		property.images = images as [string];
		await property.save();

		res.status(200).json({
			status: 'success',
			data: {
				property,
			},
		});
	}
);

// *** add image to property
export const addImages = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const property: IPropertySchema | null = await Property.findById(
			req.params.id
		).select('+owner._id');

		if (!property) {
			return next(new AppError('No property found with that ID', 404));
		}
		console.log(property?.owner._id.toString(), (req as any).user.id);

		console.log(property?.owner._id.toString() === (req as any).user.id);

		if (
			property?.owner._id.toString() !== (req as any).user.id &&
			(req as any).user.role !== 'admin'
		) {
			return next(
				new AppError('You are not allowed to upload images on this property', 403)
			);
		}

		const images = property.images;

		images.push(...req.body.images);

		property.images = images as [string];

		await property.save();

		res.status(200).json({
			status: 'success',
			data: {
				property,
			},
		});
	}
);

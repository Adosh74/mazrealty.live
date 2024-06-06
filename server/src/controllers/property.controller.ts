import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import ApprovedProp from '../models/approvedProp.model';
import Property, { IPropertySchema } from '../models/property.model';
import UserFavorite from '../models/userFavorite.model';
import APIFeatures from '../utils/APIFeatures.util';
import AppError from '../utils/AppError.util';
import catchAsync from '../utils/catchAsync.util';
import generateDescription from '../utils/descreptionGenerator.util';
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
		req.body.bedrooms = req.body.bedrooms * 1;
		req.body.bathrooms = req.body.bathrooms * 1;
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
		console.log(req.body);

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
		req.body.city = { _id: req.body.city };
		req.body.area = req.body.area * 1;
		req.body.price = req.body.price * 1;
		req.body.bedrooms = req.body.bedrooms * 1;
		req.body.bathrooms = req.body.bathrooms * 1;
		req.body.level ? (req.body.level = req.body.level * 1) : (req.body.level = 0);
		const updatedProperty = await Property.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		console.log(req.body.bathrooms);

		console.log('updatedProperty', updatedProperty?.bathrooms);

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
		const property: IPropertySchema | null = await Property.findById(
			req.params.id
		).select('+owner._id');

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

		// +[4] delete images from public/img/properties
		property.images.forEach((img) => {
			// if image not found in public/img/properties ignore it continue
			if (!fs.existsSync(path.join(process.cwd(), `/public/img/properties/${img}`)))
				return;
			fs.unlinkSync(path.join(process.cwd(), `/public/img/properties/${img}`));
		});

		// +[5] delete property contract from public/img/properties
		if (
			fs.existsSync(
				path.join(process.cwd(), `/public/img/properties/${property.contract}`)
			)
		) {
			fs.unlinkSync(
				path.join(process.cwd(), `/public/img/properties/${property.contract}`)
			);
		}

		// +[6] delete property from approved properties
		await ApprovedProp.deleteOne({ property: property._id });

		// +[7] delete property from favorites
		await UserFavorite.deleteMany({ property: property._id });

		// +[8] delete property
		await property.remove();

		// +[9] send responses
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
		const features = new APIFeatures(
			Property.find({ 'owner._id': userId }),
			req.query
		)
			.sort()
			.paginate();
		const properties = await features.query;

		properties.forEach((doc: any) => {
			doc.images.forEach((img: string) => {
				if (!img.startsWith('https')) {
					doc.images[doc.images.indexOf(img)] = `${req.protocol}://${req.get(
						'host'
					)}/img/properties/${img}`;
				}
			});
		});
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

		// check if image exists in /public/properties
		if (
			fs.existsSync(
				path.join(process.cwd(), `public/img/properties/${req.body.image}`)
			)
		) {
			// delete image from public/properties
			fs.unlinkSync(
				path.join(process.cwd(), `public/img/properties/${req.body.image}`)
			);
		}

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

// *** add property that supported description generation using gemini AI
export const createPropertyWithDescription = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		req.body.owner = { _id: (req as any).user.id };
		req.body.city = { _id: req.body.city };
		req.body.area = req.body.area * 1;
		req.body.price = req.body.price * 1;
		req.body.bedrooms = req.body.bedrooms * 1;
		req.body.bathrooms = req.body.bathrooms * 1;
		req.body.level ? (req.body.level = req.body.level * 1) : (req.body.level = 0);

		// generate description
		const description = await generateDescription(req.body);

		if (!description) {
			return next(new AppError('Failed to generate description', 500));
		}
		console.log('description', description);
		console.log('req.body', req.body);

		req.body.description = description;
		const property = await Property.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				property,
			},
		});
	}
);

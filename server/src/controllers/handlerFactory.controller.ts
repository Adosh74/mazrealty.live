import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import APIFeatures from '../utils/APIFeatures.util';
import AppError from '../utils/AppError.util';
import catchAsync from '../utils/catchAsync.util';

// *** Factory Functions

// +[1] getAll - get all documents from a collection (Model)
export const getAll = (Model: Model<any>, modelName?: string) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const features = new APIFeatures(Model.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const docs = await features.query;

		if (modelName === 'property') {
			docs.forEach((doc: any) => {
				doc.images.forEach((img: string) => {
					if (!img.startsWith('https')) {
						console.log('img', img);

						doc.images[doc.images.indexOf(img)] = `${
							req.protocol
						}://${req.get('host')}/img/properties/${img}`;
					}
				});
			});
		}

		res.status(200).json({
			status: 'success',
			results: docs.length,
			data: {
				data: docs,
			},
		});
	});

// +[2] getOne - get one document from a collection (Model) by id
export const getOne = (Model: Model<any>, popOptions?: any, modelName?: string) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		let query = Model.findById(id);
		if (popOptions) query = query.populate(popOptions);
		const doc = await query;

		if (!doc) {
			return next(new AppError('No document found with that ID', 404));
		}

		if (modelName === 'property') {
			doc.images.forEach((img: string) => {
				if (!img.startsWith('https')) {
					doc.images[doc.images.indexOf(img)] = `${req.protocol}://${req.get(
						'host'
					)}/img/properties/${img}`;
				}
			});
		}

		res.status(200).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	});

// +[3] createOne - create one document in a collection (Model)
export const createOne = (Model: Model<any>) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const doc = await Model.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	});

// +[4] updateOne - update one document in a collection (Model) by id
export const updateOne = (Model: Model<any>) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const doc = await Model.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!doc) {
			return next(new AppError('No document found with that ID', 404));
		}

		res.status(200).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	});

// +[5] deleteOne - delete one document in a collection (Model) by id
export const deleteOne = (Model: Model<any>) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const doc = await Model.findByIdAndDelete(id);

		if (!doc) {
			return next(new AppError('No document found with that ID', 404));
		}

		res.status(204).json({
			status: 'success',
			data: null,
		});
	});

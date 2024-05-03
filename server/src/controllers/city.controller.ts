import City from '../models/city.model';
import catchAsync from '../utils/catchAsync.util';
import * as Factory from './handlerFactory.controller';

// *** CRUD operation for city

export const getAllCity = catchAsync(async (req, res, next) => {
	const cities = await City.find().select('-__v').sort({ city_name_en: 1 }).exec();
	res.status(200).json({
		status: 'success',
		results: cities.length,
		data: {
			cities,
		},
	});
});
export const getOneCity = Factory.getOne(City);
export const createOneCity = Factory.createOne(City);
export const updateOneCity = Factory.updateOne(City);
export const deleteOneCity = Factory.deleteOne(City);

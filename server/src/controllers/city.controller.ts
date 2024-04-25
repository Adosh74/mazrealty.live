import City from '../models/city.model';
import * as Factory from './handlerFactory.controller';

// *** CRUD operation for city

export const getAllCity = Factory.getAll(City);
export const getOneCity = Factory.getOne(City);
export const createOneCity = Factory.createOne(City);
export const updateOneCity = Factory.updateOne(City);
export const deleteOneCity = Factory.deleteOne(City);

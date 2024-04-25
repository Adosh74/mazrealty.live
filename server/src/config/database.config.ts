import mongoose from 'mongoose';
import { LOGGER } from '../logging';
import AppError from '../utils/AppError.util';

const connectDB = () => {
	if (!process.env.MONGO_URI) return new AppError('MongoURI not found', 500);
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})
		.then((data) =>
			LOGGER.info(`Connected to MongoDB ${data.connection.name} database`)
		)
		.catch((err) => LOGGER.error(err));
};

export default connectDB;

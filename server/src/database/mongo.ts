import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { LOGGER } from '../logging';
import './../models/city.model';
import './../models/property.model';
import './../models/user.model';
import './../models/userFavorite.model';

dotenv.config({ path: `${process.cwd()}/.env` });

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
	LOGGER.error('Please make sure that you have a valid mongoURI in your .env file');
	process.exit(1);
}

// *** MongoDB Connection
mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then((data) => LOGGER.info(`Connected to MongoDB ${data.connection.name} database`))
	.catch((err) => LOGGER.error(err));

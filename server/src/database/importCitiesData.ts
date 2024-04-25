import fs from 'fs';
import { LOGGER } from '../logging';
import City from '../models/city.model';
import './mongo';

const cities = JSON.parse(fs.readFileSync(`${process.cwd()}/data/cities.json`, 'utf-8'));

const insertData = async () => {
	try {
		await City.insertMany(cities);
		LOGGER.info('Cities data successfully loaded');
	} catch (error) {
		LOGGER.error(error);
	}
	process.exit();
};

const deleteData = async () => {
	try {
		await City.deleteMany();
		LOGGER.info('Cities data successfully deleted');
	} catch (error) {
		LOGGER.error(error);
	}
	process.exit();
};

if (process.argv[2] === '--import') {
	insertData();
}

if (process.argv[2] === '--delete') {
	deleteData();
}

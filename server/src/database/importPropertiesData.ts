import fs from 'fs';
import { LOGGER } from '../logging';
import Property from '../models/property.model';
import './mongo';

const properties = JSON.parse(
	fs.readFileSync(`${process.cwd()}/data/properties.json`, 'utf-8')
);

const insertData = async () => {
	try {
		await Property.create(properties);
		LOGGER.info('Properties data successfully loaded');
	} catch (error) {
		LOGGER.error(error);
	}
	process.exit();
};

const deleteData = async () => {
	try {
		await Property.deleteMany();
		LOGGER.info('Properties data successfully deleted');
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

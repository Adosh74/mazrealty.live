import dotenv from 'dotenv';
import { app as server } from './app';
import './database/mongo';
//import './database/redis';
import { LOGGER } from './logging';

dotenv.config({ path: `${process.cwd()}/.env` });

const { PORT, NODE_ENV } = process.env;

if (!PORT) {
	LOGGER.error(
		'Please make sure that you have a valid mongoURI and port number in your .env file'
	);
	process.exit(1);
}

server.listen(PORT, () => {
	LOGGER.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});

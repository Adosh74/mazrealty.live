import dotenv from 'dotenv';
import server from './app';
import './database/mongo';
//import './database/redis';
import { LOGGER } from './logging';

dotenv.config({ path: `${process.cwd()}/.env` });

const { NODE_ENV } = process.env;

const PORT = 3001;

server.listen(PORT, () => {
	LOGGER.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});

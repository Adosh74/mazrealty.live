import dotenv from 'dotenv';
import Redis from 'ioredis';
import { LOGGER } from '../logging';

dotenv.config({ path: `${process.cwd()}/.env` });

const { REDIS_URL } = process.env;

if (!REDIS_URL) {
	LOGGER.error('Please make sure that you have a valid Redis URL in your .env file');
	process.exit(1);
}

// *** Redis Connection
export const client = new Redis(REDIS_URL);

client.on('connect', () => {
	LOGGER.info('Connected to Redis');
});

client.on('error', (err) => {
	LOGGER.error(`Redis error: ${err}`);
	process.exit(1);
});

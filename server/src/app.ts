import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import globalErrorHandler from './controllers/error.controller';
import { LOGGER } from './logging';
import routes from './routes/index.route';
import AppError from './utils/AppError.util';

export const app = express();

// *** middleware *** //
// parse application/json and url-encoded forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files
app.use(express.static('public'));

// parse cookies
app.use(cookieParser());

// enable cors and allow credentials

const whitelist = [process.env.CLIENT_URL as string];

app.use(
	cors({
		origin: function (origin, callback) {
			if (whitelist.indexOf(origin as string) !== -1) {
				callback(null, true);
			} else {
				callback(null, true);
			}
		},
		credentials: true,
	})
);

// development logging
process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : null;

// logging middleware for production
app.use((req, res, next) => {
	(req as any).requestTime = new Date().toISOString();
	LOGGER.info(
		`${(req as any).requestTime} - ${req.method} - ${req.originalUrl} - ${
			req.ip || req.socket.remoteAddress
		} - ${req.headers['user-agent']}`
	);
	next();
});

// *** routes *** //
// monitoring route
app.get('/healthz', (req, res) => {
	res.status(200).json({ message: 'OK' });
});

// API routes
app.use('/api/v1', routes);

// handle undefined routes
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

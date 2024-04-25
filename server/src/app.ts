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

// enable cors
app.use(cors());

// enable connection to the frontend app (flutter mobile app)
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});
// middleware to enable flutter mobile app to connect to the server
app.options('*', cors());

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

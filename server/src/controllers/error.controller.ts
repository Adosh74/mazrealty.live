import { LOGGER } from '../logging';
import AppError from '../utils/AppError.util';

const handleCastErrorDB = (err: any) => {
	const message = `Invalid ${err.path}: ${err.value}`;
	return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: any) => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	const message = `Duplicate field value: ${value}. Please use another value`;
	return new AppError(message, 400);
};

const handleValidationErrorDB = (err: any) => {
	const errors = Object.values(err.errors).map((el: any) => el.message);
	const message = `Invalid input data. ${errors.join('. ')}`;
	return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token. Please log in again', 401);

const handleJWTExpiredError = () =>
	new AppError('Your token has expired! Please log in again', 401);

const sendErrorDev = (err: any, res: any) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err: any, req: any, res: any) => {
	return res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
	// Operational, trusted error: send message to client
	// if (err.isOperational) {
	// 	return res.status(err.statusCode).json({
	// 		status: err.status,
	// 		message: err.message,
	// 	});
	// }
	// *** Programming or other unknown error: don't leak error details
	// 1) Log error
	// LOGGER.error('ERROR 💥', err);
	// // 2) Send generic message
	// return res.status(500).json({
	// 	status: 'error',
	// 	message: 'Something went very wrong!',
	// });
};

export default (err: any, req: any, res: any, next: any) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
	else if (process.env.NODE_ENV === 'production') {
		let error = { ...err };
		// *** production error handling
		error.message = err.message;
		if (error.name === 'CastError') error = handleCastErrorDB(error);
		if (error.code === 11000) error = handleDuplicateFieldsDB(error);
		if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
		if (error.name === 'JsonWebTokenError') error = handleJWTError();
		if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
		sendErrorProd(error, req, res);
	}
};

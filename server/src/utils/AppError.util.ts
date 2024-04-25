class AppError extends Error {
	statusCode: number = 500;
	status: string = 'error';
	isOperational: boolean = true;
	constructor(message: string, statusCode: number) {
		super(message);

		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;

import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncRequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<any>;

export default (fn: AsyncRequestHandler): RequestHandler => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};

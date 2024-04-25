import { NextFunction, Response } from 'express';
import { clearHash } from '../services/cache.service';

export default async (req: Request, res: Response, next: NextFunction) => {
	await next();
	clearHash((req as any).user.id.toString());
};

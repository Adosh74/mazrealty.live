import multer from 'multer';
import sharp from 'sharp';
import AppError from './AppError.util';
import catchAsync from './catchAsync.util';

const multerStorage = multer.memoryStorage();

const multerFilter = (req: any, file: any, cb: any) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new AppError('Not an image! Please upload only images.', 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

export const resizeUserPhoto = catchAsync(async (req: any, res: any, next: any) => {
	// 1) check if photo exist or not
	if (!req.file) {
		return next();
	}
	req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`public/img/users/${req.file.filename}`);
	next();
});

export const uploadUserPhoto = upload.single('photo');

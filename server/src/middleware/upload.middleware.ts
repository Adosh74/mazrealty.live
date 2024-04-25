import multer from 'multer';
import path from 'path';
import AppError from '../utils/AppError.util';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/img/properties');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const extension = path.extname(file.originalname);
		cb(null, 'property' + '-' + uniqueSuffix + extension);
		if (!req.body.images) {
			req.body.images = [];
		}
		if (file.fieldname === 'images') {
			req.body.images.push('property' + '-' + uniqueSuffix + extension);
		}
		if (file.fieldname === 'contract') {
			req.body.contract = 'property' + '-' + uniqueSuffix + extension;
		}
	},
});

const upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		if (
			file.mimetype.startsWith('image') ||
			file.mimetype.startsWith('application/pdf')
		) {
			cb(null, true);
		} else {
			cb(
				new AppError('Not an image or pdf! Please upload only images or pdf', 400)
			); // Removed the 'null' argument
		}
	},
}).fields([
	{
		name: 'images',
		maxCount: 7,
	},
	{
		name: 'contract',
		maxCount: 1,
	},
]);

export default upload;

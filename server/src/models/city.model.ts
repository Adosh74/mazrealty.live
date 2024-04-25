import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICitySchema extends Document {
	_id: string;
	city_name_ar: string;
	city_name_en: string;
}

const citySchema: Schema<ICitySchema> = new Schema({
	city_name_ar: {
		type: String,
		required: [true, 'Please tell us the Arabic city name!'],
		trim: true,
		maxlength: [255, 'The name must be at least 255 characters'],
	},
	city_name_en: {
		type: String,
		required: [true, 'Please tell us the English city name!'],
		trim: true,
		maxlength: [255, 'The name must be at least 255 characters'],
	},
});

const City: Model<ICitySchema> = mongoose.model('City', citySchema);

export default City;

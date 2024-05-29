import mongoose, { Schema, Document, Model } from 'mongoose';

interface IOwner {
	_id: string;
	name?: string;
	photo?: string;
	email?: string;
	phone?: string;
	whatsapp?: string;
}

interface ICity {
	_id: string;
	city_name_ar: string;
	city_name_en: string;
}
// interface ILocation {
// 	type: string;
// 	coordinates: [number];
// 	address: string;
// 	description: string;
// }
export interface IPropertySchema extends Document {
	_id: string;
	name: string;
	description: string;
	price: number;
	owner: IOwner;
	address: string;
	images: [string];
	contract: string;
	approved: boolean;
	// location: ILocation;
	bedrooms: number;
	bathrooms: number;
	city: ICity;
	Furnished: boolean;
	level: number;
	type: string;
	find: (query: any) => any;
}

export const propertySchema: Schema<IPropertySchema> = new Schema(
	{
		// 1
		name: {
			type: String,
			required: [true, 'The Property must has a name'],
			trim: true,
			maxlength: [255, 'The name must be at least 255 characters'],
		},
		// 2
		description: {
			type: String,
			required: [true, 'The Property must has a description'],
			maxlength: [1200, 'The description must be at least 1200 characters'],
		},
		// 3
		price: {
			type: Number,
			required: [true, 'The Property must has a price'],
		},
		owner: {
			_id: {
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: [true, 'The Property must has a owner'],
			},
			name: {
				type: String,
			},
			phone: {
				type: String,
			},
			email: {
				type: String,
			},
			whatsapp: {
				type: String,
			},
			photo: {
				type: String,
			},
		},
		// 4
		address: {
			type: String,
			required: [true, 'The Property must has a address'],
			trim: true,
			maxlength: [255, 'The address must be at least 255 characters'],
		},
		// 5
		images: [String],
		// 6
		contract: {
			type: String,
			required: [true, 'You must provide a contract'],
		},
		approved: {
			type: Boolean,
			default: false,
		},
		// location: {
		// 	type: {
		// 		type: String,
		// 		default: 'Point',
		// 		enum: ['Point'],
		// 	},
		// 	coordinates: [Number],
		// 	address: String,
		// 	description: String,
		// },
		// 7
		bedrooms: {
			type: Number,
			default: 0,
			required: [true, 'The Property must has a number of bedrooms'],
		},
		// 8
		bathrooms: {
			type: Number,
			default: 0,
			required: [true, 'The Property must has a number of bathrooms'],
		},
		// 9
		city: {
			_id: {
				type: Schema.Types.ObjectId,
				ref: 'City',
				required: [true, 'The Property must has a city'],
			},
			city_name_ar: {
				type: String,
			},
			city_name_en: {
				type: String,
			},
		},
		// 10
		area: {
			type: Number,
			required: [true, 'The Property must has a area size'],
		},
		// 11
		type: {
			type: String,
			enum: ['apartment', 'villa', 'office', 'shop'],
			default: 'apartment',
		},
		// 12
		transaction: {
			type: String,
			enum: ['sale', 'rent'],
			default: 'sale',
		},
		// 13
		Furnished: {
			type: Boolean,
			default: false,
		},
		// 14
		level: {
			type: Number,
			default: 0,
		},
		// 15
		latitude: {
			type: String,
			trim: true,
			maxlength: [255, 'The latitude must be at least 255 characters'],
			default: '30.06263',
		},
		// 16
		longitude: {
			type: String,
			trim: true,
			maxlength: [255, 'The longitude must be at least 255 characters'],
			default: '31.24967',
		},
	},
	{
		timestamps: true,
	}
);

// add indexes improve the performance of the queries
// propertySchema.index({ location: '2dsphere' });
propertySchema.index({ price: 1 });
// full text search index
propertySchema.index({
	name: 'text',
	type: 'text',
	description: 'text',
	address: 'text',
	transaction: 'text',
	area: 'text',
	bedrooms: 'text',
	bathrooms: 'text',
	'city.city_name_ar': 'text',
	'city.city_name_en': 'text',
});

// pre save middleware to populate owner info before saving
propertySchema.pre('save', async function (next) {
	const owner = await this.model('User').findById(this.owner._id);
	const city = await this.model('City').findById(this.city._id);
	if (!owner || !city) {
		return next(new Error('Owner or City not found'));
	}
	this.owner = {
		_id: owner?._id,
		name: owner?.name,
		photo: owner?.photo,
		email: owner?.email,
		phone: owner?.phone,
		whatsapp: owner?.whatsapp,
	};
	this.city = {
		_id: city?._id,
		city_name_ar: city?.city_name_ar,
		city_name_en: city?.city_name_en,
	};
	next();
});
/// for insertMany

// *** Query Middleware

// +[2] not serve Property is not approved
// propertySchema.pre(/^find/, function (next) {
// 	this.find({ approved: { $ne: false } });
// 	next();
// });

const Property: Model<IPropertySchema> = mongoose.model('Property', propertySchema);

export default Property;

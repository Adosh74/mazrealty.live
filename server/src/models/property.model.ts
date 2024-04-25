import mongoose, { Schema, Document, Model } from 'mongoose';

interface IOwner {
	_id: string;
	name?: string;
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
	bedrooms: string;
	bathrooms: string;
	city: ICity;
	Furnished: boolean;
	level: number;
	find: (query: any) => any;
}

export const propertySchema: Schema<IPropertySchema> = new Schema(
	{
		name: {
			type: String,
			required: [true, 'The Property must has a name'],
			trim: true,
			maxlength: [255, 'The name must be at least 255 characters'],
		},
		description: {
			type: String,
			required: [true, 'The Property must has a description'],
			trim: true,
		},
		price: {
			type: Number,
			required: [true, 'The Property must has a price'],
		},
		owner: {
			_id: {
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: [true, 'The Property must has a owner'],
				select: false,
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
		},
		address: {
			type: String,
			required: [true, 'The Property must has a address'],
		},
		images: [String],
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
		bedrooms: {
			type: String,
			default: 0,
			required: [true, 'The Property must has a number of bedrooms'],
		},
		bathrooms: {
			type: String,
			default: 0,
			required: [true, 'The Property must has a number of bathrooms'],
		},
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
		area: {
			type: String,
			required: [true, 'The Property must has a area size'],
		},
		type: {
			type: String,
			enum: ['apartment', 'villa', 'office', 'shop'],
			default: 'apartment',
		},
		transaction: {
			type: String,
			enum: ['sale', 'rent'],
			default: 'sale',
		},
		Furnished: {
			type: Boolean,
			default: false,
		},
		level: {
			type: Number,
			default: 0,
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

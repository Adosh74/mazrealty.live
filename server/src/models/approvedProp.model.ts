import mongoose, { Schema, Document } from 'mongoose';

export interface IApprovedProp extends Document {
	lawyer: string;
	property: string;
}

const ApprovedPropSchema = new Schema<IApprovedProp>({
	lawyer: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	property: {
		type: Schema.Types.ObjectId,
		ref: 'Property',
		required: true,
	},
});

// pre middleware to populate the user info and property info
ApprovedPropSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'lawyer',
		select: 'name email phone whatsapp role -_id',
	}).populate({
		path: 'property',
		select: 'name address price images -_id',
	});
	next();
});

const ApprovedProp = mongoose.model<IApprovedProp>('ApprovedProp', ApprovedPropSchema);

export default ApprovedProp;

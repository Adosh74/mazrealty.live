import mongoose from 'mongoose';

export interface IBooking {
	property: string;
	user: string;
	price: number;
	createdAt: Date;
	responded: boolean;
}

const bookingSchema = new mongoose.Schema<IBooking>({
	property: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Property',
		required: [true, 'Booking must belong to a property'],
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Booking must belong to a user'],
	},
	price: {
		type: Number,
		required: [true, 'Booking must have a price'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	responded: {
		type: Boolean,
		default: false,
	},
});

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;

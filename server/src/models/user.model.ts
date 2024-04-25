import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import mongoose, { Schema, Document, Model } from 'mongoose';
import validator from 'validator';

export interface IUserSchema extends Document {
	_id: string;
	name: string;
	email: string;
	photo: string;
	role: string;
	phone?: string;
	whatsapp?: string;
	password: string;
	passwordConfirm?: string;
	passwordChangedAt?: Date;
	passwordResetToken?: string;
	passwordResetExpires?: Date;
	correctPassword: (
		candidatePassword: string,
		userPassword: string
	) => Promise<boolean>;
	passwordChangedAfter: (JWTTimestamp: number) => boolean;
	createPasswordResetToken: () => string;
}

const userSchema: Schema<IUserSchema> = new Schema({
	name: {
		type: String,
		required: [true, 'Please tell us your name!'],
		trim: true,
		maxlength: [255, 'The name must be at least 255 characters'],
	},
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	photo: {
		type: String,
		default: 'default.jpg',
	},
	role: {
		type: String,
		enum: ['user', 'admin', 'lawyer'],
		default: 'user',
	},
	phone: {
		type: String,
		trim: true,
	},
	whatsapp: {
		type: String,
		trim: true,
	},
	password: {
		type: String,
		minlength: 8,
		required: [true, 'Please provide a password'],
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm your password'],
		validate: {
			// This only works on CREATE and SAVE!!!
			validator: function (this: IUserSchema, el: string) {
				return el === this.password;
			},
			message: 'Passwords are not the same!',
		},
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
});

// hash password before saving to database
userSchema.pre<IUserSchema>('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);

	// Delete passwordConfirm field
	this.passwordConfirm = undefined;
	next();
});

// update passwordChangedAt property for the user
userSchema.pre<IUserSchema>('save', function (next) {
	if (!this.isModified('password') || this.isNew) return next();

	this.passwordChangedAt = new Date(Date.now() - 1000);
	next();
});

// check if password is correct for login
userSchema.methods.correctPassword = async function (
	candidatePassword: string,
	userPassword: string
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChangedAfter = function (JWTTimestamp: number) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			(this.passwordChangedAt.getTime() / 1000).toString(),
			10
		);
		return JWTTimestamp < changedTimestamp;
	}
	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

	return resetToken;
};

// delete user photo from public/img/users

const User: Model<IUserSchema> = mongoose.model('User', userSchema);

export default User;

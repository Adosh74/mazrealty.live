import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUserFavorite extends Document {
	user: string;
	property: string;
}

interface IUserFavoriteModel extends Model<IUserFavorite> {
	findUserFavorites(userId: string): Promise<IUserFavorite[]>;
}

const userFavoriteSchema = new Schema<IUserFavorite, IUserFavoriteModel>({
	user: {
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

// find all properties that a user has favorite it
userFavoriteSchema.statics.findUserFavorites = async function (userId: string) {
	return this.find({ user: userId }).populate('property');
};

const UserFavorite = mongoose.model<IUserFavorite, IUserFavoriteModel>(
	'UserFavorite',
	userFavoriteSchema
);

export default UserFavorite;

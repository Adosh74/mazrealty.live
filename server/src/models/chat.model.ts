import mongoose, { Schema, Document } from 'mongoose';
import { IUserSchema } from './user.model';

export interface IChat extends Document {
	_id: string;
	usersIDs: [string];
	createdAt: Date;
	seenBy: [string];
	lastMessage?: string;
	messages?: [string];
	receiver?: Pick<IUserSchema, 'name' | 'photo'>;
}

const ChatSchema = new Schema<IChat>(
	{
		usersIDs: {
			type: [Schema.Types.ObjectId],
			ref: 'User',
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		seenBy: {
			type: [Schema.Types.ObjectId],
			ref: 'User',
		},
		lastMessage: {
			type: String,
		},
		messages: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Message',
			},
		],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const Chat = mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;

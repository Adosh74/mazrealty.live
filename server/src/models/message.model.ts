import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
	_id: string;
	text: string;
	userId: string;
	chatId: string;
	createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
	{
		text: {
			type: String,
			required: true,
			trim: true,
			maxlength: [400, 'The message must be at least 400 characters'],
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		chatId: {
			type: Schema.Types.ObjectId,
			ref: 'Chat',
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;

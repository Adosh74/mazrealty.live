import { NextFunction, Request, Response } from 'express';
import Chat from '../models/chat.model';
import Message from '../models/message.model';
import catchAsync from '../utils/catchAsync.util';

export const addMessage = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = (req as any).user._id;
		const { chatId } = req.params;
		const { text } = req.body;

		const chat = await Chat.findById(chatId);

		if (!chat) {
			return res.status(404).json({ message: 'Chat not found' });
		}

		if (!chat.usersIDs.includes(userId)) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		// create message
		const message = await Message.create({
			text,
			userId,
			chatId,
		});

		// update chat
		chat.seenBy = [userId];
		chat.lastMessage = message.text;
		chat.messages ? chat.messages.push(message._id) : (chat.messages = [message._id]);

		await chat.save();

		res.status(201).json(message);
	}
);

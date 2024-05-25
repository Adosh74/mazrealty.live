import { NextFunction, Request, Response } from 'express';
import Chat from '../models/chat.model';
import Message from '../models/message.model';
import User from '../models/user.model';
import AppError from '../utils/AppError.util';
import catchAsync from '../utils/catchAsync.util';

export const addMessage = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = (req as any).user._id;
		const { text, to } = req.body;

		if (!text || !to) {
			return next(new AppError('text and to are required', 400));
		}

		if (to === userId) {
			next(new AppError('you can not send message for your sel', 400));
		}

		// check if to not mongo id
		const toUser = await User.findById(to);

		if (!toUser) {
			return next(new AppError('to is not valid', 400));
		}

		// check if chat exists
		let chat = await Chat.findOne({
			usersIDs: { $all: [userId, to] },
		});

		if (!chat) {
			chat = await Chat.create({
				usersIDs: [userId, to],
			});
		}

		if (!chat.usersIDs.includes(userId)) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		// create message
		const message = await Message.create({
			text,
			userId,
			chatId: chat._id,
		});

		// update chat
		chat.seenBy = [userId];
		chat.lastMessage = message.text;
		chat.messages ? chat.messages.push(message._id) : (chat.messages = [message._id]);

		await chat.save();

		res.status(201).json(message);
	}
);

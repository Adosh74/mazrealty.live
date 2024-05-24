import { NextFunction, Request, Response } from 'express';
import Chat, { IChat } from '../models/chat.model';
import Message from '../models/message.model';
import User from '../models/user.model';
import catchAsync from '../utils/catchAsync.util';

export const getMyChats = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// get user id from req.user
		const userId = (req as any).user._id;

		// get all chats where user id is in usersIDs array and. remove user id from usersIDs array
		const chats: IChat[] = await Chat.find({ usersIDs: userId }).select(
			'-__v -updatedAt'
		);

		// promise all to get all receiver name and photo from users collection to new object
		const newChatsObj = await Promise.all(
			chats.map(async (chat) => {
				const receiverId = chat.usersIDs.find((id) => {
					return id.toString() !== userId.toString();
				});

				const receiver = await User.findById(receiverId).select('name photo');
				if (receiver) {
					if (receiver.photo && !receiver.photo.startsWith('http')) {
						receiver.phone = `${req.protocol}://${req.get(
							'host'
						)}/img/users/${receiver.photo}`;
					}
					chat.receiver = receiver;
				}

				return {
					...chat.toJSON(),
					receiver,
				};
			})
		);

		res.status(200).json(newChatsObj);
	}
);

export const getOneChat = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const chatId = req.params.id;

		const chat = await Chat.findById(chatId).select('-__v -updatedAt').populate({
			path: 'messages',
			select: '-__v -updatedAt',
		});

		const userId = (req as any).user._id;

		if (!chat) {
			return res.status(404).json({ message: 'Chat not found' });
		}

		if (!chat.usersIDs.includes(userId)) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		// get last message from messages collection where chatId is chat._id
		const lastMessage = await Message.findOne({ chatId }).sort({ createdAt: -1 });

		chat.lastMessage = lastMessage?.text || '';

		// push seenBy if not already in seenBy
		if (!chat.seenBy.includes(userId)) {
			chat.seenBy.push(userId);
		}

		await chat.save();

		res.status(200).json(chat);
	}
);

export const addChat = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const senderId = (req as any).user._id;
		const { receiverId } = req.body;

		// check if receiver in users
		const receiverExists = receiverId ? await User.findById(receiverId) : null;

		if (!receiverExists) {
			return res.status(400).json({ message: 'Receiver not found' });
		}

		// check if chat already exists
		const chatExists = await Chat.findOne({
			usersIDs: { $all: [senderId, receiverId] },
		});

		if (chatExists) {
			// send message not chat
			return res.status(400).json({ message: 'Chat already exists' });
		}

		const chat = await Chat.create({
			usersIDs: [senderId, receiverId],
		});

		res.status(201).json(chat);
	}
);

export const readChat = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const chatId = req.params.id;

		const chat = await Chat.findById(chatId);

		const userId = (req as any).user._id;

		if (!chat) {
			return res.status(404).json({ message: 'Chat not found' });
		}

		if (!chat.usersIDs.includes(userId)) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		// push userId to seenBy if not already in seenBy
		if (!chat.seenBy.includes(userId)) {
			chat.seenBy.push(userId);
			await chat.save();
		}

		res.status(200).json(chat);
	}
);

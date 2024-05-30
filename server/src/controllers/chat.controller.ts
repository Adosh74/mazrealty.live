import { NextFunction, Request, Response } from 'express';
import Chat, { IChat } from '../models/chat.model';
import Message from '../models/message.model';
import User from '../models/user.model';
import AppError from '../utils/AppError.util';
import catchAsync from '../utils/catchAsync.util';

export const getMyChats = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// get user id from req.user
		const userId = (req as any).user._id;

		// get all chats where user id is in usersIDs array and. remove user id from usersIDs array
		const chats: IChat[] = await Chat.find({ usersIDs: userId })
			.select('-__v -updatedAt')
			.select('-__v -updatedAt -messages')
			.sort({ updatedAt: -1 });

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
		const to = req.params.id;

		if (!to) {
			return next(new AppError('to is required', 400));
		}

		if (to === (req as any).user._id) {
			return next(new AppError('you can not get chat with your self', 400));
		}

		const chat = await Chat.findOne({
			usersIDs: { $all: [(req as any).user._id, to] },
		})
			.select('-__v -updatedAt')
			.populate({
				path: 'messages',
				select: '-__v -updatedAt',
			});

		const userId = (req as any).user._id;

		if (!chat) {
			// create chat
			const newChat = await Chat.create({
				usersIDs: [userId, to],
			});

			return res.status(200).json(newChat);
		}

		if (!chat.usersIDs.includes(userId)) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		// get last message from messages collection where chatId is chat._id
		const lastMessage = await Message.findOne({ chatId: chat._id }).sort({
			createdAt: -1,
		});

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

		if (!receiverId) {
			return next(new AppError('receiverId is required', 400));
		}

		if (senderId === receiverId) {
			return next(new AppError('you can not chat with your self', 400));
		}

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

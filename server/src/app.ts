import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import { Server } from 'socket.io';
import globalErrorHandler from './controllers/error.controller';
import { LOGGER } from './logging';
import routes from './routes/index.route';
import AppError from './utils/AppError.util';

const app = express();

// *** middleware *** //
// parse application/json and url-encoded forms....
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files
app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../../client/dist')));
}

// parse cookies
app.use(cookieParser());

// enable cors and allow credentials

const whitelist = [process.env.CLIENT_URL as string];

app.use(
	cors({
		origin: function (origin, callback) {
			if (whitelist.indexOf(origin as string) !== -1) {
				callback(null, true);
			} else {
				callback(null, true);
			}
		},
		credentials: true,
	})
);

// development logging
process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : null;

// logging middleware for production
app.use((req, res, next) => {
	(req as any).requestTime = new Date().toISOString();
	LOGGER.info(
		`${(req as any).requestTime} - ${req.method} - ${req.originalUrl} - ${
			req.ip || req.socket.remoteAddress
		} - ${req.headers['user-agent']}`
	);
	next();
});

// *** routes *** //
// monitoring route
app.get('/healthz', (req, res) => {
	res.status(200).json({ message: 'OK' });
});

// API routes
app.use('/api/v1', routes);

// handle undefined routes
// app.all('*', (req, res, next) => {
// 	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
// });

app.use(globalErrorHandler);

if (process.env.NODE_ENV === 'production') {
	app.get('*', (req, res) =>
		res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
	);
}

// create http server
const server = http.createServer(app);
const io = new Server(server);

/// *** socket.io *** ///
// array to store all connected users
let onlineUsers: { userId: string; socketId: string }[] = [];

// function handle add user
const addUser = (userId: string, socketId: string) => {
	const userExit = onlineUsers.find((user) => user.userId === userId);
	if (!userExit) {
		onlineUsers.push({ userId, socketId });
	}
};

// function to remove user from array
const removeUser = (socketId: string) => {
	onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

// get connected user
const getUser = (userId: string) => {
	return onlineUsers.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
	// *** add user event ***
	socket.on('newUser', (userId) => {
		addUser(userId, socket.id);
	});

	// *** send message event ***
	socket.on('sendMessage', ({ receiverId, data }) => {
		const receiver = getUser(receiverId);
		if (!receiver) return LOGGER.error('User not found');
		io.to(receiver.socketId).emit('getMessage', data);
	});

	// *** disconnect event ***
	socket.on('disconnect', () => {
		removeUser(socket.id);
	});
});

export default server;

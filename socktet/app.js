// Corrected import statement
import http from 'http';
import { Server } from 'socket.io';

// Require the http module

const server = http.createServer(); // Create an HTTP server

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:5173',
	},
});

// array to store all connected users
let onlineUsers = [];

// function handle add user
const addUser = (userId, socketId) => {
	const userExit = onlineUsers.find((user) => user.userId === userId);
	if (!userExit) {
		onlineUsers.push({ userId, socketId });
	}
};

// function to remove user from array
const removeUser = (socketId) => {
	onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

// get connected user
const getUser = (userId) => {
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
		if (!receiver) return console.log('User not found');
		io.to(receiver.socketId).emit('getMessage', data);
	});

	// *** disconnect event ***
	socket.on('disconnect', () => {
		removeUser(socket.id);
	});
});

const PORT = 4000;
server.listen(PORT, () => {
	console.log(`Socket server running on port ${PORT}`);
});

import { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { format } from 'timeago.js';
import { AuthContext } from '../../context/authContext';
import { SocketContext } from '../../context/socketContext';
import apiRequest from '../../lib/apiRequest';
import useNotificationStore from '../../lib/notificationStore';
import './chat.scss';

function Chat({ chats }) {
	const [chat, setChat] = useState(null);
	const { currentUser } = useContext(AuthContext);
	const { socket } = useContext(SocketContext);
	const decrease = useNotificationStore((state) => state.decrease);

	const messageEndRef = useRef();

	useEffect(() => {
		messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [chat]);

	const handleOpenChat = async (chatId, receiver) => {
		try {
			const res = await apiRequest.get(`/chats/${receiver._id}`);
			if (res.data.seenBy.includes(currentUser._id)) {
				decrease();
			}
			setChat({ ...res.data, receiver });
		} catch (error) {
			console.log(error);
			toast.error('error load chat', {
				style: {
					border: '1px solid #713200',
					padding: '16px',
					paddingLeft: '25px',
					paddingRight: '25px',
					color: '#713200',
				},
				iconTheme: {
					primary: '#713200',
					secondary: '#FFFAEE',
				},
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const text = formData.get('text');
		if (!text) return;

		try {
			const res = await apiRequest.post('/messages/', {
				text,
				to: chat.receiver._id,
			});
			setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
			e.target.reset();
			socket.emit('sendMessage', {
				receiverId: chat.receiver._id,
				data: res.data,
			});
		} catch (error) {
			console.log(error);
			toast.error('error send message', {
				style: {
					border: '1px solid #713200',
					padding: '16px',
					paddingLeft: '25px',
					paddingRight: '25px',
					color: '#713200',
				},
				iconTheme: {
					primary: '#713200',
					secondary: '#FFFAEE',
				},
			});
		}
	};

	useEffect(() => {
		const read = async () => {
			try {
				await apiRequest.patch('/chats/read/' + chat._id);
			} catch (err) {
				console.log(err);
				toast.error('error read message', {
					style: {
						border: '1px solid #713200',
						padding: '16px',
						paddingLeft: '25px',
						paddingRight: '25px',
						color: '#713200',
					},
					iconTheme: {
						primary: '#713200',
						secondary: '#FFFAEE',
					},
				});
			}
		};

		if (chat && socket) {
			socket.on('getMessage', (data) => {
				if (chat._id === data.chatId) {
					setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
					read();
				}
			});
		}
		return () => {
			socket.off('getMessage');
		};
	}, [chat, socket]);

	return (
		<div className="chat">
			<div className="messages">
				<h1>Messages</h1>
				{chats.map((c) => (
					<div
						key={c._id}
						className="message"
						style={{
							backgroundColor:
								c.seenBy.includes(currentUser._id) || chat?._id == c._id
									? 'white'
									: '#fecd514e',
						}}
						onClick={() => handleOpenChat(c._id, c.receiver)}
					>
						<img
							src={c.receiver.photo ? c.receiver.photo : '/default.jpg'}
							alt="receiver photo"
						/>
						<span>{c.receiver.name}</span>
						<p>{c.lastMessage}</p>
					</div>
				))}
			</div>
			{chat && (
				<div className="chatBox">
					<div className="top">
						<div className="user">
							<img
								src={chat.receiver.photo || '/default.jpg'}
								alt="user photo"
							/>
							{chat.receiver.name}
						</div>
						<span className="close" onClick={() => setChat(null)}>
							X
						</span>
					</div>
					<div className="center">
						{chat.messages.map((message) => (
							<div
								className="chatMessage"
								style={{
									alignSelf:
										message.userId === currentUser._id
											? 'flex-end'
											: 'flex-start',
									textAlign:
										message.userId === currentUser._id
											? 'right'
											: 'left',
								}}
								key={message._id}
							>
								<p>{message.text}</p>
								<span>{format(message.createdAt)}</span>
							</div>
						))}
						<div ref={messageEndRef}></div>
					</div>
					<form className="bottom" onSubmit={handleSubmit}>
						<textarea name="text"></textarea>
						<button>Send</button>
					</form>
				</div>
			)}
		</div>
	);
}

export default Chat;

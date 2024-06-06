import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DOMPurify from 'dompurify';
import { Phone, MessageCircle, Trash2, FilePenLine } from 'lucide-react';
import { useContext, useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import Map from '../../components/map/Map';
import Slider from '../../components/slider/Slider';
import { AuthContext } from '../../context/authContext';
import { SocketContext } from '../../context/socketContext';
import apiRequest from '../../lib/apiRequest';
import './singlePage.scss';

function SinglePage() {
	const [chat, setChat] = useState(null);
	const property = useLoaderData();
	const [fav, setFav] = useState(property ? property.isFav : false);
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	/////////////////////////////////////////////////////////////////////////////////
	const { socket } = useContext(SocketContext);
	const messageEndRef = useRef();
	const [chatColor, setChatColor] = useState(null);

	useEffect(() => {
		messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [chat]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const text = formData.get('text');
		if (!text) return;

		try {
			const res = await apiRequest.post('/messages/', {
				text,
				to: property.owner._id,
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

	const handleOpenChat = async (chatId, receiver) => {
		try {
			const res = await apiRequest.get(`/chats/${receiver._id}`);
			console.log(res.data);
			console.log(receiver._id);
			setChat({ ...res.data, receiver });
			setChatColor(true);
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
					setChat((prev) => ({
						...prev,
						messages: [...prev.messages, data],
					}));
					read();
				}
			});
		}
		return () => {
			socket.off('getMessage');
		};
	}, [chat, socket]);
	/////////////////////////////////////////////////////////////////////////////////

	if (!property) {
		return (
			<div className="pageNotFound">
				<h1>
					<span>404</span> - Property Not Found
				</h1>
				<p>The page you are looking for does not exist.</p>
			</div>
		);
	}

	const handleSave = async () => {
		if (!currentUser) {
			toast.error('You need to login first', {
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
			setTimeout(() => {
				navigate('/login');
			}, 2000);
		} else {
			try {
				const res = await apiRequest.post(`/favorites/${property._id}`);
				if (res.status === 201) {
					setFav(!fav);
					toast.success('Property saved successfully', {
						style: {
							border: '1px solid #713200',
							padding: '16px',
							paddingLeft: '25px',
							paddingRight: '25px',
							color: '#3ddb55',
						},
						iconTheme: {
							primary: '#3ddb55',
							secondary: '#FFFAEE',
						},
					});
				}
				if (res.status === 204) {
					setFav(!fav);
					toast.success('Property removed from favorites', {
						style: {
							border: '1px solid #713200',
							padding: '16px',
							paddingLeft: '25px',
							paddingRight: '25px',
							color: '#3ddb55',
						},
						iconTheme: {
							primary: '#3ddb55',
							secondary: '#FFFAEE',
						},
					});
				}
			} catch (error) {
				toast.error('Something went wrong', {
					style: {
						border: '1px solid #713200',
						padding: '16px',
						paddingLeft: '25px',
						paddingRight: '25px',
						color: '#713200',
					},
				});
			}
		}
	};

	const deleteProperty = async () => {
		if (window.confirm('Are you sure you want to delete this property?')) {
			try {
				const res = await apiRequest.delete(`/properties/${property._id}`);
				if (res.status === 204) {
					toast.success('The property has been deleted', {
						style: {
							borderRadius: '10px',
							background: '#333',
							color: '#fff',
						},
					});
					navigate('/profile');
				} else {
					toast.error('Failed to delete property');
				}
			} catch (error) {
				console.log(error);
				toast.error('Something went wrong');
			}
		}
	};

	const handleCheckContract = async () => {
		if (!currentUser) {
			toast.error('You need to login first', {
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
			setTimeout(() => {
				navigate('/login');
			}, 2000);
		} else {
			try {
				const res = await apiRequest(
					`/bookings/checkout-session/${property._id}`
				);
				console.log(res.data);
				// redirect to checkout page with session id
				console.log(res.data.session.url);
				window.location.href = res.data.session.url;
			} catch (error) {
				toast.error('Something went wrong', {
					style: {
						border: '1px solid #713200',
						padding: '16px',
						paddingLeft: '25px',
						paddingRight: '25px',
						color: '#713200',
					},
				});
			}
		}
	};

	return (
		<div className="singlePage">
			<div className="details">
				{((currentUser && currentUser._id === property.owner._id) ||
					(currentUser && currentUser.role === 'admin')) && (
					<div className="ownerButtons">
						<button onClick={deleteProperty} className="deleteProperty">
							Delete property &nbsp; <Trash2 />
						</button>
						<Link to={`/edit/property/${property._id}`}>
							<button className="editProperty">
								Edit property &nbsp;
								<FilePenLine />
							</button>
						</Link>
					</div>
				)}

				<div className="wrapper">
					<Slider images={property.images} />
					<div className="info">
						<div className="top">
							<div className="post">
								<h1>{property.name}</h1>
								<div className="address">
									<img src="/pin.png" alt="" />
									<span>{property.city.city_name_en}</span>
								</div>
								{/* address details */}
								<div className="address">
									<span>{property.address}</span>
								</div>
								<div className="price">$ {property.price}</div>
							</div>
							<div>
								<div className="user">
									<img
										src={property.owner.photo || '/default.jpg'}
										alt=""
									/>
									<span>{property.owner.name}</span>
									<ButtonGroup
										variant="outlined"
										aria-label="Basic button group"
									>
										<Button
											onClick={() => {
												// move to other page
												// https://wa.me/2${property.owner.phone}
												console.log(`2${property.owner.phone}`);
												window.open(
													`https://wa.me/2${property.owner.phone}`
												);
											}}
											color="success"
										>
											{' '}
											<MessageCircle />
										</Button>
										<Button
											onClick={() => {
												// move to call to phone
												window.open(
													`tel:${property.owner.phone}`
												);
											}}
											color="inherit"
										>
											<Phone />
										</Button>
									</ButtonGroup>
								</div>
								{/* if current user ._id == property owner._id hide check contract */}

								{!(
									currentUser && currentUser._id === property.owner._id
								) && (
									<div className="check-contract">
										<Button
											variant="outlined"
											color="error"
											onClick={handleCheckContract}
										>
											CHECK CONTRACT
										</Button>
									</div>
								)}
							</div>
						</div>
						<div
							className="bottom"
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(property.description),
							}}
						></div>
					</div>
				</div>
			</div>
			<div className="features">
				<div className="wrapper">
					<p className="title">General</p>
					<div className="listVertical">
						<div className="feature">
							<img src="/fee.png" alt="" />
							<div className="featureText">
								<span>Transaction Type</span>
								<p>{property.transaction}</p>
							</div>
						</div>
						<div className="feature">
							<img src="/utility.png" alt="" />
							<div className="featureText">
								<span>Furnished</span>
								<p>{property.Furnished ? 'Yes' : 'No'}</p>
							</div>
						</div>
						<div className="feature">
							<img src="/logo.png" alt="" />
							<div className="featureText">
								<span>Property Type</span>
								<p>{property.type}</p>
							</div>
						</div>
					</div>
					<p className="title">Sizes</p>
					<div className="sizes">
						<div className="size">
							<img src="/size.png" alt="" />
							<span>{property.area} (Sq. M.)</span>
						</div>
						<div className="size">
							<img src="/bed.png" alt="" />
							<span>{property.bedrooms} beds</span>
						</div>
						<div className="size">
							<img src="/bath.png" alt="" />
							<span>{property.bathrooms} bathroom</span>
						</div>
					</div>
					{!chat && (
						<>
							<p className="title">Location</p>
							<div className="mapContainer">
								<Map items={[property]} />
							</div>
						</>
					)}
					{/* //////////////////////////////////////////////////////////////// */}
					{chat && (
						<div className="chatBox">
							<div className="top">
								<div className="user">
									<img
										src={
											property.owner.photo &&
											property.owner.photo.startsWith('http')
												? property.owner.photo
												: '/default.jpg'
										}
										alt="user photo"
									/>
									{property.owner.name}
								</div>
								<span
									className="close"
									onClick={() => {
										setChat(null);
										setChatColor(false);
									}}
								>
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
					{/* //////////////////////////////////////////////////////////////// */}

					<div
						className="buttons"
						style={{
							justifyContent:
								property.owner._id === currentUser._id
									? 'flex-end'
									: 'space-between',
						}}
					>
						{!(property.owner._id === currentUser._id) && (
							<button
								onClick={() =>
									handleOpenChat(currentUser._id, property.owner)
								}
								style={{
									backgroundColor: chatColor ? '#8bc8da' : 'white',
								}}
							>
								<img src="/chat.png" alt="" />
								Send a Message
							</button>
						)}
						<button
							onClick={handleSave}
							style={{
								backgroundColor: fav ? '#fece51' : 'white',
							}}
						>
							<img src="/save.png" alt="" />
							{fav ? 'Property Saved' : 'Save the Property'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SinglePage;

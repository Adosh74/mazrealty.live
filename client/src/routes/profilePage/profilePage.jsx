import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { SmilePlus, RefreshCwOff } from 'lucide-react';
import { Suspense, useContext } from 'react';
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import Chat from '../../components/chat/Chat';
import List from '../../components/list/List';
import { AuthContext } from '../../context/authContext';
import apiRequest from '../../lib/apiRequest';
import baseURL from '../../lib/baseURL';
import './profilePage.scss';

function ProfilePage() {
	const navigate = useNavigate();
	const { updateUser, currentUser } = useContext(AuthContext);

	const data = useLoaderData();

	const handleLogout = async () => {
		try {
			apiRequest.get('/auth/logout');

			updateUser(null);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="profilePage">
			<div className="details">
				<div className="wrapper">
					<div className="userData">
						<div className="title">
							<h1>Profile</h1>
							<Link to="/profile/update">
								<button className="updateButton">Update Profile</button>
							</Link>
							{(currentUser.role === 'lawyer' ||
								currentUser.role === 'admin') && (
								<Link to="/lawyer">
									<Button variant="contained" color="warning">
										contracts
									</Button>
								</Link>
							)}
						</div>
						<div className="info">
							<span>
								photo:
								<img
									src={`${currentUser.photo.startsWith('http') ? currentUser.photo : `${baseURL}/img/users/${currentUser.photo}`} `}
									alt="user photo"
								/>
							</span>
							<span>
								Name: <b>{currentUser.name}</b>
							</span>
							<span>
								E-mail: <b>{currentUser.email}</b>
							</span>
							<button onClick={handleLogout}>Logout</button>
						</div>
					</div>
					<div className="title">
						<h1>My Properties</h1>
						<Link to="/add">
							<button className="updateButton">Create New Property</button>
						</Link>
					</div>

					<Suspense
						fallback={
							<Box sx={{ width: 1100 }}>
								<Skeleton />
								<Skeleton animation="wave" />
								<Skeleton />
							</Box>
						}
					>
						<Await
							resolve={data.properties}
							errorElement={
								<div className="error-message">
									<p>Error loading properties &nbsp;</p>
									<RefreshCwOff />
								</div>
							}
						>
							{(properties) => {
								if (properties.length === 0) {
									return (
										<div className="no-properties">
											<p>No properties found &nbsp;</p>
											<SmilePlus />
										</div>
									);
								} else {
									return <List items={properties} />;
								}
							}}
						</Await>
					</Suspense>
				</div>
			</div>
			<div className="chatContainer">
				<div className="wrapper">
					<Suspense
						fallback={
							<Box sx={{ width: 700 }}>
								<Skeleton />
								<Skeleton animation="wave" />
								<Skeleton />
							</Box>
						}
					>
						<Await
							resolve={data.chatResponse}
							errorElement={
								<div className="error-message">
									<p>Failed to loading chats &nbsp;</p>
									<RefreshCwOff />
								</div>
							}
						>
							{(chatResponse) => {
								if (chatResponse.data.length === 0) {
									return (
										<div className="no-chats">
											<p>No Chats Yet &nbsp;</p>
											<SmilePlus />
										</div>
									);
								} else {
									return <Chat chats={chatResponse.data} />;
								}
							}}
						</Await>
					</Suspense>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;

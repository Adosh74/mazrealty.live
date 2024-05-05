import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Chat from '../../components/chat/Chat';
import List from '../../components/list/List';
import { AuthContext } from '../../context/authContext';
import apiRequest from '../../lib/apiRequest';
import baseURL from '../../lib/baseURL';
import './profilePage.scss';

function ProfilePage() {
	const navigate = useNavigate();
	const { updateUser, currentUser } = useContext(AuthContext);

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
					<div className="title">
						<h1>User Information</h1>
						<Link to="/profile/update">
							<button>Update Profile</button>
						</Link>
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
					<div className="title">
						<h1>My List</h1>
						<Link to="/add">
							<button>Create New Property</button>
						</Link>
					</div>
					<List />
					<div className="title">
						<h1>Saved List</h1>
					</div>
					<List />
				</div>
			</div>
			<div className="chatContainer">
				<div className="wrapper">
					<Chat />
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;

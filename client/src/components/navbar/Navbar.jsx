import { BookHeart } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import baseURL from '../../lib/baseURL';
import useNotificationStore from '../../lib/notificationStore';
import './navbar.scss';

function Navbar() {
	const [open, setOpen] = useState(false);
	const { currentUser } = useContext(AuthContext);
	const fetch = useNotificationStore((state) => state.fetch);
	const number = useNotificationStore((state) => state.number);

	if (currentUser) fetch();

	return (
		<nav>
			<div className="left">
				<a href="/" className="logo">
					<img src="/maz1.png" alt="" />
					<span>MAZ REALTY</span>
				</a>
				<a href="/">Home</a>
				<a href="/about">About</a>
				<a href="mailto:support@mazrealty.live">Contact</a>
				{currentUser && (
					<a href="/favourites">
						{' '}
						Favourites
						<BookHeart />
					</a>
				)}
			</div>
			<div className="right">
				{currentUser ? (
					<div className="user">
						<img
							src={`${currentUser.photo.startsWith('http') ? currentUser.photo : `${baseURL}/img/users/${currentUser.photo}`} `}
							alt=""
						/>
						<span>{currentUser.name.split(' ')[0]}</span>
						<Link to="/profile" className="profile">
							{number > 0 && <div className="notification">{number}</div>}
							<span>Profile</span>
						</Link>
					</div>
				) : (
					<>
						<a href="/login">Sign in</a>
						<a href="/register" className="register">
							Sign up
						</a>
					</>
				)}
				<div className="menuIcon">
					<img
						src="/menu.png"
						alt=""
						onClick={() => setOpen((prev) => !prev)}
					/>
				</div>
				<div className={open ? 'menu active' : 'menu'}>
					<a href="/">Home</a>
					<a href="/about">About</a>
					<a href="mailto:support@mazrealty.live">Contact</a>
					{currentUser && <a href="/favourites">Favourites</a>}

					{currentUser ? (
						<>
							<a href="/profile">Profile</a>
							<button onClick={() => setOpen((prev) => !prev)}>Hide</button>
						</>
					) : (
						<>
							<a href="/login">Sign in</a>
							<a href="/register">Sign up</a>
							<button onClick={() => setOpen((prev) => !prev)}>Hide</button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;

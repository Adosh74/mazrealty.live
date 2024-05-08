import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import baseURL from '../../lib/baseURL';
import './navbar.scss';

function Navbar() {
	const [open, setOpen] = useState(false);
	const { currentUser } = useContext(AuthContext);

	return (
		<nav>
			<div className="left">
				<a href="/" className="logo">
					<img src="/maz1.png" alt="" />
					<span>MAZ Realty</span>
				</a>
				<a href="/">Home</a>
				<a href="/">About</a>
				<a href="/">Contact</a>
				{currentUser  &&<a href="/">Favourites</a>}
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
							<div className="notification">3</div>
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
					<a href="/">About</a>
					<a href="/">Contact</a>
					<a href="/">Agents</a>
					<a href="/login">Sign in</a>
					<a href="/register">Sign up</a>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;

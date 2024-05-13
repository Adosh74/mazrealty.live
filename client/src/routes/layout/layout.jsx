import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/authContext';
import './layout.scss';

function Layout() {
	return (
		<div className="layout">
			<div className="navbar">
				<Navbar />
			</div>
			<div className="content">
				<Outlet />
			</div>
		</div>
	);
}

function RequireAuth() {
	const { currentUser } = useContext(AuthContext);

	if (!currentUser) {
		return <Navigate to="/login" />;
	}

	return (
		currentUser && (
			<div className="layout">
				<div className="navbar">
					<Navbar />
				</div>
				<div className="content">
					<Outlet />
				</div>
			</div>
		)
	);
}

function RequireAdminOrLayer() {
	const { currentUser } = useContext(AuthContext);
	if (!currentUser) {
		return <Navigate to="/login" />;
	}

	if (currentUser.role !== 'admin' && currentUser.role !== 'lawyer') {
		return <Navigate to="/" />;
	}

	return (
		currentUser && (
			<div className="layout">
				<div className="navbar">
					<Navbar />
				</div>
				<div className="content">
					<Outlet />
				</div>
			</div>
		)
	);
}

export { Layout, RequireAuth, RequireAdminOrLayer };

import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import apiRequest from '../../lib/apiRequest';
import './login.scss';

function Login() {
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { updateUser, currentUser } = useContext(AuthContext);

	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) {
			navigate('/');
		}
	}, [currentUser, navigate]);
	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		setError('');
		const formatDate = new FormData(e.target);

		const email = formatDate.get('email');
		const password = formatDate.get('password');

		try {
			const res = await apiRequest.post('/auth/login', {
				email,
				password,
			});
			updateUser(res.data.data.user);
			navigate('/');
			toast.success(' You Welcome ', {
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
		} catch (error) {
			toast.error(`${error.response.data.message}`, {
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
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="login">
			<div className="formContainer">
				<form onSubmit={handleSubmit}>
					<h1>
						Sign In To <span>MAZ Realty</span>
					</h1>
					<input name="email" required type="email" placeholder="Email" />
					<input
						name="password"
						required
						minLength={6}
						type="password"
						placeholder="Password"
					/>
					<button disabled={isLoading}>Login</button>
					{error && <span>{error}</span>}
					<Link to="/register">{"Don't"} you have an account?</Link>
				</form>
			</div>
			<div className="imgContainer">
				<img src="/bg.png" alt="" />
			</div>
		</div>
	);
}

export default Login;

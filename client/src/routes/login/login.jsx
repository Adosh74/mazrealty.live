import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import './login.scss';

function Login() {
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

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
			localStorage.setItem('user', JSON.stringify(res.data.data.user));
		} catch (error) {
			setError(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="login">
			<div className="formContainer">
				<form onSubmit={handleSubmit}>
					<h1>Welcome back</h1>
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

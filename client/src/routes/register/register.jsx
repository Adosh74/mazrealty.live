import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.scss';

function Register() {
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		setError('');

		const formatDate = new FormData(e.target);

		const name = formatDate.get('fullName');
		const email = formatDate.get('email');
		const password = formatDate.get('password');
		const passwordConfirm = formatDate.get('passwordConfirm');
		const phone = formatDate.get('phone');
		const whatsapp = formatDate.get('whatsapp');

		try {
			const res = await axios.post('http://localhost:3001/api/v1/auth/signup', {
				name,
				email,
				password,
				passwordConfirm,
				phone,
				whatsapp,
			});

			navigate('/login');
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	return (
		<div className="register">
			<div className="formContainer">
				<form onSubmit={handleSubmit}>
					<h1>Create an Account</h1>
					<input name="fullName" type="text" placeholder="Full Name" />
					<input name="email" type="text" placeholder="Email" />
					<input
						name="password"
						minLength={6}
						type="password"
						placeholder="Password"
					/>
					<input
						name="passwordConfirm"
						type="password"
						minLength={6}
						placeholder="Confirm Password"
					/>
					<input name="phone" type="text" placeholder="Phone" />
					<input name="whatsapp" type="text" placeholder="Whatsapp" />
					<button disabled={isLoading}>Register</button>
					{error && <span>{error}</span>}
					<Link to="/login">Do you have an account?</Link>
				</form>
			</div>
			<div className="imgContainer">
				<img src="/bg.png" alt="" />
			</div>
		</div>
	);
}

export default Register;

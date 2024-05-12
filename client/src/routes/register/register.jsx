import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import apiRequest from '../../lib/apiRequest';
import './register.scss';

function Register() {
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { currentUser } = useContext(AuthContext);

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

		const name = formatDate.get('fullName');
		const email = formatDate.get('email');
		const password = formatDate.get('password');
		const passwordConfirm = formatDate.get('passwordConfirm');
		const phone = formatDate.get('phone');
		const whatsapp = formatDate.get('whatsapp');

		try {
			await apiRequest.post('/auth/signup', {
				name,
				email,
				password,
				passwordConfirm,
				phone,
				whatsapp,
			});

			navigate('/login');
			toast.success(' Successful registration ', {
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
		<div className="register">
			<div className="formContainer">
				<form onSubmit={handleSubmit}>
					<h1>
						{' '}
						Sign Up To <span>MAZ Realty</span>
					</h1>
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

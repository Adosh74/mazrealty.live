import { useContext, useState } from 'react';
import UploadWidget from '../../components/uploadWidget/uploadWidget';
import { AuthContext } from '../../context/authContext';
import apiRequest from '../../lib/apiRequest';
import baseURL from '../../lib/baseURL';
import './profileUpdatePage.scss';

function ProfileUpdatePage() {
	const { currentUser, updateUser } = useContext(AuthContext);

	const [error, setError] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [photo, setPhoto] = useState(currentUser.photo);

	const handleUpdateInformationSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);

		const name = formData.get('fullName');
		const email = formData.get('email');
		const phone = formData.get('phone');
		const whatsapp = formData.get('whatsapp');

		try {
			const res = await apiRequest.patch('/users/updateMe', {
				name,
				email,
				phone,
				whatsapp,
				photo,
			});

			updateUser(res.data.data.user);
			setError('');
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	const handleUpdatePasswordSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);

		const passwordCurrent = formData.get('currentPassword');
		const password = formData.get('newPassword');
		const passwordConfirm = formData.get('confirmNewPassword');

		if (password !== passwordConfirm) {
			setErrorMessage('Passwords do not match');
			return;
		}

		try {
			await apiRequest.patch('/users/updateMyPassword', {
				passwordCurrent,
				password,
				passwordConfirm,
			});

			setErrorMessage('');
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	};
	return (
		<div className="profileUpdatePage">
			<div className="formContainer">
				<h1
					style={{
						textAlign: 'center',
						marginBottom: '1rem',
						fontSize: '2rem',
					}}
				>
					Update Profile
				</h1>
				<form onSubmit={handleUpdateInformationSubmit}>
					<h1>Update Information</h1>
					<div className="item">
						<label htmlFor="fullName">Full Name</label>
						<input
							id="fullName"
							name="fullName"
							type="text"
							defaultValue={currentUser.name}
						/>
					</div>
					<div className="item">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							defaultValue={currentUser.email}
						/>
					</div>
					<div className="item">
						<label htmlFor="phone">Phone</label>
						<input
							minLength={11}
							maxLength={11}
							id="phone"
							name="phone"
							type="text"
							defaultValue={currentUser.phone}
						/>
					</div>
					<div className="item">
						<label htmlFor="whatsapp">Whatsapp</label>
						<input
							minLength={11}
							maxLength={11}
							id="whatsapp"
							name="whatsapp"
							type="text"
							defaultValue={currentUser.whatsapp}
						/>
					</div>
					{error && (
						<span style={{ color: 'red', textAlign: 'center' }}>{error}</span>
					)}
					<button>Save Information and Photo</button>
				</form>

				<form onSubmit={handleUpdatePasswordSubmit}>
					<h1>Update Password</h1>
					<div className="item">
						<label htmlFor="currentPassword">Current Password</label>
						<input
							id="currentPassword"
							name="currentPassword"
							type="password"
						/>
					</div>
					<div className="item">
						<label htmlFor="newPassword">New Password</label>
						<input id="newPassword" name="newPassword" type="password" />
					</div>
					<div className="item">
						<label htmlFor="confirmNewPassword">Confirm New Password</label>
						<input
							id="confirmNewPassword"
							name="confirmNewPassword"
							type="password"
						/>
					</div>
					{errorMessage && (
						<span style={{ color: 'red', textAlign: 'center' }}>
							{errorMessage}
						</span>
					)}
					<button>Update Password</button>
				</form>
			</div>

			<div className="sideContainer">
				<img
					src={`${photo.startsWith('http') ? photo : `${baseURL}/img/users/${currentUser.photo}`} `}
					alt=""
					className="avatar"
				/>
				<UploadWidget
					uwConfig={{
						cloudName: 'mazrealty',
						uploadPreset: 'mazrealty.live',
						multiple: false,
						maxImageFileSize: 2000000, // 2MB
						folder: 'users',
					}}
					setPhoto={setPhoto}
				/>
			</div>
		</div>
	);
}

export default ProfileUpdatePage;

import { useContext, useEffect, useState } from 'react';
import UploadWidget from '../../components/uploadWidget/uploadWidget';
import { AuthContext } from '../../context/authContext';
import apiRequest from '../../lib/apiRequest';
import baseURL from '../../lib/baseURL';
import './profileUpdatePage.scss';
import toast from "react-hot-toast";

function ProfileUpdatePage() {
    const { currentUser, updateUser } = useContext(AuthContext);

    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [photo, setPhoto] = useState(currentUser.photo);
    const [informationChanged, setInformationChanged] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);


    const [initialValues, setInitialValues] = useState({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        whatsapp: currentUser.whatsapp,
        photo: currentUser.photo,
    });

    useEffect(() => {
        setInitialValues({
            name: currentUser.name,
            email: currentUser.email,
            phone: currentUser.phone,
            whatsapp: currentUser.whatsapp,
            photo: currentUser.photo,
        });
    }, [currentUser]);

    const handleUpdateInformationSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('fullName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const whatsapp = formData.get('whatsapp');

        try {
            setLoadingInfo(true);
            const res = await apiRequest.patch('/users/updateMe', {
                name,
                email,
                phone,
                whatsapp,
                photo,
            });

            updateUser(res.data.data.user);
            setError('');
            toast.success('Successfully updated information');
            setInformationChanged(false); // Reset the information changed state
            setInitialValues({
                name,
                email,
                phone,
                whatsapp,
                photo,
            });
        } catch (error) {
            setError(error.response.data.message);
            toast.error("Update failed");
        } finally {
            setLoadingInfo(false);
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
            setLoadingPassword(true);
            await apiRequest.patch('/users/updateMyPassword', {
                passwordCurrent,
                password,
                passwordConfirm,
            });
            setErrorMessage('');
            setPasswordChanged(false); // Reset the password changed state
            toast.success('Successfully updated password');
        } catch (error) {
            setErrorMessage(error.response.data.message);
            toast.error("Update failed");
        } finally {
            setLoadingPassword(false);
        }
    };

    const handleInputChange = (e) => {
        const formData = new FormData(e.target.closest('form'));
        const name = formData.get('fullName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const whatsapp = formData.get('whatsapp');

        setInformationChanged(
            name !== initialValues.name ||
            email !== initialValues.email ||
            phone !== initialValues.phone ||
            whatsapp !== initialValues.whatsapp ||
            photo !== initialValues.photo
        );
    };

    const handlePasswordChange = () => {
        setPasswordChanged(true);
    };

    const handlePhotoChange = (newPhoto) => {
        setPhoto(newPhoto);
        setInformationChanged(newPhoto !== initialValues.photo);
    };

    return (
        <div className="profileUpdatePage">
            <div className="formContainer">
                <form onSubmit={handleUpdateInformationSubmit} onChange={handleInputChange}>
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
                    <button type="submit" disabled={!informationChanged || loadingInfo}>
                        {loadingInfo ? 'Updating...' : 'Save Information and Photo'}
                    </button>
                </form>

                <form onSubmit={handleUpdatePasswordSubmit} onChange={handlePasswordChange}>
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
                    <button type="submit" disabled={!passwordChanged || loadingPassword}>
                        {loadingPassword ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>

            <div className="sideContainer">
                <img 
                    src={`${photo.startsWith('http') ? photo : `${baseURL}/img/users/${currentUser.photo}`}`} 
                    alt="User Avatar" 
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
                    setPhoto={handlePhotoChange}
                />
            </div>
        </div>
    );
}

export default ProfileUpdatePage;

import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import SliderForEdit from '../../components/sliderForEdit/SliderForEdit';
import { AuthContext } from '../../context/authContext';
import apiRequest from '../../lib/apiRequest';
import './editMyProperty.scss';

function EditProperty() {
	const [value, setValue] = useState('');
	const [cities, setCities] = useState([]);
	const [property, setProperty] = useState([]);
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const { currentUser } = useContext(AuthContext);

	const navigate = useNavigate();
	const params = useParams();

	//get current user
	useEffect(() => {
		setLoading(true);
		async function fetchData() {
			try {
				const citiesRes = await apiRequest.get('/cities');

				// get id from params
				const propertyRes = await apiRequest.get(`/properties/${params.id}`);

				if (
					propertyRes.data.data.data.owner._id !== currentUser._id &&
					currentUser.role !== 'admin'
				) {
					toast.error(`You are not allowed to edit this property`, {
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
					navigate('/');
				} else {
					setProperty(propertyRes.data.data.data);
					setLoading(false);
				}

				setCities(citiesRes.data.data.cities);
			} catch (error) {
				console.log(error);
				// error using toast
				toast.error(`error data loading`, {
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
				navigate('/');
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [currentUser._id, currentUser.role, navigate, params.id]);

	const override = {
		display: 'block',
		margin: '0 auto',
		borderColor: 'green',
	};
	if (loading)
		return (
			<div
				className="newPostPage"
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '80vh',
				}}
			>
				<div className="loading">
					<ClipLoader
						loading={loading}
						color="#ff0"
						cssOverride={override}
						size={150}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			</div>
		);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		value !== ''
			? formData.append('description', value)
			: formData.append('description', property.description);
		if (!images) return alert('Please select at least one image for the property');

		//  make images like contract
		// const img = Array.from(images);

		// for (const oneImg of img) {
		// 	formData.append('images', oneImg);
		// }
		// formData.append('images', ...img);
		const input = Object.fromEntries(formData);
		console.log(input.city);
		const cityId = cities.find((city) => city._id === input.city)._id;
		formData.delete('city');
		formData.append('city', cityId);
		input.city = cityId;

		//  ////////////////////////////////////////////////////////////////
		// setImages(property.images);
		//  ////////////////////////////////////////////////////////////////

		try {
			const res = await apiRequest.patch(`/properties/${property._id}`, input);
			if (res.status === 200) {
				toast.success('The property has been updated', {
					style: {
						borderRadius: '10px',
						background: '#333',
						color: '#fff',
					},
				});
			} else {
				toast.error('Failed to update property');
			}
			setError('');
		} catch (error) {
			console.log(error);
			// setError(error.response.data.message);
			toast.error(`Something went wrong: ${error.response.data.message}`);
		}
	};

	const handleImageChange = (e) => {
		let count = 7 - property.images.length;
		if (e.target.files.length + property.images.length > 7) {
			toast.error(`Maxmam files is ${count}`, {
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

			e.target.value = null;
			setImages(null);
		} else {
			setImages(e.target.files);
		}
	};

	return (
		<div className="editProperty">
			<div className="formContainer">
				<h1>Edit Property</h1>
				<div className="wrapper">
					<form onSubmit={handleSubmit}>
						<div className="item">
							<label htmlFor="name">Title</label>
							<input
								id="name"
								name="name"
								type="text"
								required
								defaultValue={property.name}
							/>
						</div>
						<div className="item">
							<label htmlFor="price">Price</label>
							<input
								id="price"
								name="price"
								type="number"
								required
								defaultValue={property.price}
							/>
						</div>
						<div className="item">
							<label htmlFor="address">Address</label>
							<input
								id="address"
								name="address"
								type="text"
								required
								defaultValue={property.address}
							/>
						</div>
						<div className="item description">
							<label htmlFor="description">Description</label>
							<ReactQuill
								theme="snow"
								onChange={setValue}
								defaultValue={property.description}
							/>
						</div>
						<div className="item">
							<label htmlFor="city">City</label>
							{cities.length > 0 && (
								<select name="city" defaultValue={property.city._id}>
									{cities.map((city) => (
										<option key={city._id} value={city._id}>
											{city.city_name_en}
										</option>
									))}
								</select>
							)}
						</div>
						<div className="item">
							<label htmlFor="bedrooms">Bedroom Number</label>
							<input
								min={1}
								id="bedrooms"
								name="bedrooms"
								type="number"
								required
								defaultValue={property.bedrooms}
							/>
						</div>
						<div className="item">
							<label htmlFor="bathrooms">Bathroom Number</label>
							<input
								min={1}
								id="bathrooms"
								name="bathrooms"
								type="number"
								required
								defaultValue={property.bathrooms}
							/>
						</div>
						<div className="item">
							<label htmlFor="latitude">Latitude</label>
							<input
								id="latitude"
								name="latitude"
								type="text"
								defaultValue={property.latitude}
							/>
						</div>
						<div className="item">
							<label htmlFor="longitude">Longitude</label>
							<input
								id="longitude"
								name="longitude"
								type="text"
								defaultValue={property.longitude}
							/>
						</div>
						<div className="item">
							<label htmlFor="transaction">Transaction Type</label>
							<select
								name="transaction"
								defaultValue={property.transaction}
							>
								<option value="rent">Rent</option>
								<option value="sale">Sale</option>
							</select>
						</div>
						<div className="item">
							<label htmlFor="type">Property Type</label>
							<select name="type" defaultValue={property.type}>
								<option value="apartment">Apartment</option>
								<option value="villa">Villa</option>
								<option value="office">Office</option>
								<option value="shop">Shop</option>
							</select>
						</div>
						<div className="item">
							<label htmlFor="area">Total area size (Sq. M.)</label>
							<input
								min={0}
								id="area"
								name="area"
								type="number"
								required
								defaultValue={property.area}
							/>
						</div>
						{/* add level */}
						<div className="item">
							<label htmlFor="level">Level</label>
							<input
								id="level"
								name="level"
								type="number"
								required
								defaultValue={property.level}
							/>
						</div>
						<div className="item">
							<label htmlFor="furnished">Furnished</label>
							<select name="furnished" defaultValue={property.Furnished}>
								<option value="true">Yes</option>
								<option value="false">No</option>
							</select>
						</div>
						<button className="sendButton">Edit</button>
						{error && <p className="error">{error}</p>}
					</form>
				</div>
			</div>
			<div className="sideRight">
				<div className="top">
					<input
						type="file"
						multiple
						accept="image/*"
						onChange={handleImageChange}
					/>
					<div className="selected-images">
						{images &&
							images.length + property.images.length <= 7 &&
							Array.from(images).map((image, index) => (
								<img
									key={index}
									src={URL.createObjectURL(image)}
									alt="property"
									style={{ minHeight: '40vh', maxHeight: '40vh' }}
								/>
							))}
					</div>
				</div>
				<div className="Buttom">
					<h1>Existing pictures</h1>

					<SliderForEdit images={property.images} propertyId={property._id} />
				</div>
			</div>
		</div>
	);
}

export default EditProperty;

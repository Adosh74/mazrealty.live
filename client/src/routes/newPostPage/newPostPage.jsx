import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import apiRequest from '../../lib/apiRequest';
import './newPostPage.scss';

function NewPostPage() {
	const [value, setValue] = useState('');
	const [addButton, setAddButton] = useState(false);
	const [cities, setCities] = useState([]);
	const [images, setImages] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	//get current user
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		formData.append('description', value);
		if (!images) return alert('Please select at least one image for the property');

		//  make images like contract
		// get only 7 images
		const img = Array.from(images).slice(0, 7);

		for (const oneImg of img) {
			formData.append('images', oneImg);
		}
		// formData.append('images', ...img);
		const input = Object.fromEntries(formData);
		const cityId = cities.find((city) => city.city_name_en === input.city)._id;
		formData.delete('city');
		formData.append('city', cityId);
		console.log(input);
		setAddButton(true);
		try {
			setAddButton(true);
			const res = await apiRequest.post('/properties', formData);
			navigate(`/property/${res.data.data.property._id}`);
			toast.success('Created Successfully', {
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
			setLoading(false);
		}
	};

	useEffect(() => {
		async function fetchData() {
			const res = await apiRequest.get('/cities');

			setCities(res.data.data.cities);
			setLoading(false);
		}
		fetchData();
	}, []);

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
	const handleImages = (e) => {
		if (e.target.files.length > 7) {
			toast.error('Maxmam files is 7 ', {
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
		<div className="newPostPage">
			<div className="formContainer">
				<h1>Add New Property</h1>
				<div className="wrapper">
					<form onSubmit={handleSubmit}>
						<div className="item">
							<label htmlFor="name">Title</label>
							<input id="name" name="name" type="text" required />
						</div>
						<div className="item">
							<label htmlFor="price">Price</label>
							<input id="price" name="price" type="number" required />
						</div>
						<div className="item">
							<label htmlFor="address">Address</label>
							<input id="address" name="address" type="text" required />
						</div>
						<div className="item description">
							<label htmlFor="description">Description</label>
							<ReactQuill theme="snow" onChange={setValue} value={value} />
						</div>
						<div className="item">
							<label htmlFor="city">City</label>
							{cities.length > 0 && (
								<select name="city">
									{cities.map((city) => (
										<option key={city._id} value={city.id}>
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
							/>
						</div>
						<div className="item">
							<label htmlFor="latitude">Latitude</label>
							<input id="latitude" name="latitude" type="text" />
						</div>
						<div className="item">
							<label htmlFor="longitude">Longitude</label>
							<input id="longitude" name="longitude" type="text" />
						</div>
						<div className="item">
							<label htmlFor="transaction">Transaction Type</label>
							<select name="transaction">
								<option value="rent" defaultChecked>
									Rent
								</option>
								<option value="sale">Sale</option>
							</select>
						</div>
						<div className="item">
							<label htmlFor="type">Property Type</label>
							<select name="type">
								<option value="apartment">Apartment</option>
								<option value="villa">Villa</option>
								<option value="office">Office</option>
								<option value="shop">Shop</option>
							</select>
						</div>
						<div className="item">
							<label htmlFor="area">Total area size (Sq. M.)</label>
							<input min={0} id="area" name="area" type="number" required />
						</div>
						{/* add level */}
						<div className="item">
							<label htmlFor="level">Level</label>
							<input id="level" name="level" type="number" required />
						</div>
						{/* add Furnished that yes or no */}
						<div className="item">
							<label htmlFor="furnished">Furnished</label>
							<select name="furnished">
								<option value="true">Yes</option>
								<option value="false">No</option>
							</select>
						</div>
						{/* add contract field accept file type pdf or image */}
						<div className="item">
							<label htmlFor="contract">Contract</label>
							<input type="file" name="contract" accept=".pdf, image/*" />
						</div>

						<button className="sendButton" disabled={addButton}>
							Add
						</button>
					</form>
				</div>
			</div>
			<div className="sideContainer">
				{/* take multiple images from user */}
				<input
					type="file"
					multiple
					// set max images to 7
					max={7}
					accept="image/*"
					onChange={handleImages}
				/>
				{/* display selected images */}
				<div className="imageContainer">
					{images &&
						images.length <= 7 &&
						Array.from(images).map((image, index) => (
							<img
								key={index}
								src={URL.createObjectURL(image)}
								alt="property"
							/>
						))}
				</div>
			</div>
		</div>
	);
}

export default NewPostPage;

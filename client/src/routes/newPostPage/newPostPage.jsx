import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiRequest from '../../lib/apiRequest';
import './newPostPage.scss';

function NewPostPage() {
	const [value, setValue] = useState('');
	const [cities, setCities] = useState([]);
	const [images, setImages] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const input = Object.fromEntries(formData);
		console.log(input);
		console.log(value);
	};

	useEffect(() => {
		async function fetchData() {
			const res = await apiRequest.get('/cities');

			setCities(res.data.data.cities);
		}
		fetchData();
	}, []);
	return (
		<div className="newPostPage">
			<div className="formContainer">
				<h1>Add New Property</h1>
				<div className="wrapper">
					<form onSubmit={handleSubmit}>
						<div className="item">
							<label htmlFor="title">Title</label>
							<input id="title" name="title" type="text" />
						</div>
						<div className="item">
							<label htmlFor="price">Price</label>
							<input id="price" name="price" type="number" />
						</div>
						<div className="item">
							<label htmlFor="address">Address</label>
							<input id="address" name="address" type="text" />
						</div>
						<div className="item description">
							<label htmlFor="desc">Description</label>
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
							<label htmlFor="bedroom">Bedroom Number</label>
							<input min={1} id="bedroom" name="bedroom" type="number" />
						</div>
						<div className="item">
							<label htmlFor="bathroom">Bathroom Number</label>
							<input min={1} id="bathroom" name="bathroom" type="number" />
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
							<label htmlFor="type">Type</label>
							<select name="type">
								<option value="rent" defaultChecked>
									Rent
								</option>
								<option value="sale">Sale</option>
							</select>
						</div>
						<div className="item">
							<label htmlFor="type">Property</label>
							<select name="property">
								<option value="apartment">Apartment</option>
								<option value="house">House</option>
								<option value="condo">Condo</option>
								<option value="land">Land</option>
							</select>
						</div>
						<div className="item">
							<label htmlFor="utilities">Utilities Policy</label>
							<select name="utilities">
								<option value="owner">Owner is responsible</option>
								<option value="tenant">Tenant is responsible</option>
								<option value="shared">Shared</option>
							</select>
						</div>
						<div className="item">
							<label htmlFor="pet">Pet Policy</label>
							<select name="pet">
								<option value="allowed">Allowed</option>
								<option value="not-allowed">Not Allowed</option>
							</select>
						</div>
						<div className="item">
							<label htmlFor="income">Income Policy</label>
							<input
								id="income"
								name="income"
								type="text"
								placeholder="Income Policy"
							/>
						</div>
						<div className="item">
							<label htmlFor="size">Total Size (sqft)</label>
							<input min={0} id="size" name="size" type="number" />
						</div>
						<div className="item">
							<label htmlFor="school">School</label>
							<input min={0} id="school" name="school" type="number" />
						</div>
						<div className="item">
							<label htmlFor="bus">bus</label>
							<input min={0} id="bus" name="bus" type="number" />
						</div>
						<div className="item">
							<label htmlFor="restaurant">Restaurant</label>
							<input
								min={0}
								id="restaurant"
								name="restaurant"
								type="number"
							/>
						</div>
						<button className="sendButton">Add</button>
					</form>
				</div>
			</div>
			<div className="sideContainer">
				{/* take multiple images from user */}
				<input
					type="file"
					multiple
					accept="image/*"
					onChange={(e) => setImages(e.target.files)}
				/>
				{/* display selected images */}
				<div className="images">
					{images.length > 0 &&
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

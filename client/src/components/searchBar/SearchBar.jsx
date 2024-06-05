import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import './searchBar.scss';

const transactions = ['sale', 'rent'];

function SearchBar() {
	const [cities, setCities] = useState([]);
	const [query, setQuery] = useState({
		transaction: 'sale',
		city: '',
		minPrice: 0,
		maxPrice: 1000000000,
	});

	const switchType = (val) => {
		setQuery((prev) => ({ ...prev, transaction: val }));
	};

	useEffect(() => {
		async function fetchData() {
			const res = await apiRequest.get('/cities');

			setCities(res.data.data.cities);
		}
		fetchData();
	}, []);

	const handleChange = (e) => {
		setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const queryStr =
		query.city !== ''
			? `?transaction=${query.transaction}&city._id=${query.city}&price[gte]=${query.minPrice}&price[lte]=${query.maxPrice}`
			: `?transaction=${query.transaction}&price[gte]=${query.minPrice}&price[lte]=${query.maxPrice}`;
	return (
		<div className="searchBar">
			<div className="type">
				{transactions.map((type) => (
					<button
						key={type}
						onClick={() => switchType(type)}
						className={query.transaction === type ? 'active' : ''}
					>
						{type}
					</button>
				))}
			</div>
			<form>
				{/* <input type="text" name="location" placeholder="City Location" /> */}
				{/* hot input from cities and choose one*/}
				<select
					name="city"
					onChange={(e) =>
						setQuery((prev) => ({ ...prev, city: e.target.value }))
					}
				>
					<option value="">Select City</option>
					{cities.map((city) => (
						<option key={city._id} value={city._id}>
							{city.city_name_en}
						</option>
					))}
				</select>

				<input
					type="number"
					name="minPrice"
					min={0}
					max={10000000}
					placeholder="Min Price"
					onChange={handleChange}
				/>
				<input
					type="number"
					name="maxPrice"
					min={0}
					max={10000000}
					placeholder="Max Price"
					onChange={handleChange}
				/>

				<Link to={`/list${queryStr}`}>
					<button>
						<img src="/search.png" alt="" />
					</button>
				</Link>
			</form>
		</div>
	);
}

export default SearchBar;

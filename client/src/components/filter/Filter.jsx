import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import './filter.scss';

function Filter() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [query, setQuery] = useState({
		'city._id': searchParams.get('city._id') || null, // done
		transaction: searchParams.get('transaction') || null, // done
		'area[lte]': searchParams.get('area[lte]') || null,
		'area[gte]': searchParams.get('area[gte]') || null,
		type: searchParams.get('type') || null, // done
		Furnished: searchParams.get('Furnished') || null,
		level: searchParams.get('level') || null, // done
		bathrooms: searchParams.get('bathrooms') || null, // done
		bedrooms: searchParams.get('bedrooms') || null,
		'price[gte]': searchParams.get('price[gte]') || 0,
		'price[lte]': searchParams.get('price[lte]') || 100000000, // done
	});
	const [cities, setCities] = useState([]);
	const citySearched = cities.find((city) => city._id === searchParams.get('city._id'));

	useEffect(() => {
		async function fetchData() {
			const res = await apiRequest.get('/cities');

			setCities(res.data.data.cities);
		}
		fetchData();
	}, [searchParams]);

	// *** handle change in filter
	const handleChange = (e) => {
		setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	// *** handle filter
	const handleFilter = () => {
		const newQuery = {};
		for (const key in query) {
			if (query[key] !== 'any' && query[key] !== null && query[key] !== '') {
				newQuery[key] = query[key];
			}
		}
		newQuery.page = 1;
		console.log(newQuery);
		setSearchParams(newQuery);
	};
	return (
		<div className="filter">
			<h1>
				Search results for{' '}
				<b>{citySearched ? citySearched.city_name_en : 'all cities'}</b>
			</h1>
			<div className="bottom">
				<div className="item">
					<label htmlFor="city._id">City</label>
					<select name="city._id" onChange={handleChange}>
						<option value="">
							{citySearched ? citySearched.city_name_en : 'City'}
						</option>
						{/* set option for any */}
						<option value="">any</option>
						{cities.map((city) => (
							<option key={city._id} value={city._id}>
								{city.city_name_en}
							</option>
						))}
					</select>
				</div>
				<div className="item">
					<label htmlFor="transaction">Transaction Type</label>
					<select
						name="transaction"
						id="transaction"
						onChange={handleChange}
						defaultValue={query.transaction ? query.transaction : 'any'}
					>
						<option value="">any</option>
						<option value="sale">Buy</option>
						<option value="rent">Rent</option>
					</select>
				</div>
				<div className="item">
					<label htmlFor="type">Property Type</label>
					<select
						name="type"
						id="type"
						onChange={handleChange}
						defaultValue={query.type ? query.type : 'any'}
					>
						<option value="">any</option>
						<option value="apartment">Apartment</option>
						<option value="villa">Villa</option>
						<option value="office">Office</option>
						<option value="shop">Shop</option>
					</select>
				</div>
				<div className="item">
					<label htmlFor="price[gte]">Min Price</label>
					<input
						type="number"
						id="price[gte]"
						name="price[gte]"
						placeholder="any"
						onChange={handleChange}
						defaultValue={query['price[gte]'] ? query['price[gte]'] : 0}
					/>
				</div>
				<div className="item">
					<label htmlFor="price[lte]">Max Price</label>
					<input
						type="number"
						id="price[lte]"
						name="price[lte]"
						placeholder="any"
						onChange={handleChange}
						defaultValue={query['price[lte]'] ? query['price[lte]'] : 'any'}
					/>
				</div>
				<div className="item">
					<label htmlFor="area[gte]">Minimum Area Size</label>
					<input
						type="number"
						id="area[gte]"
						name="area[gte]"
						placeholder="any"
						onChange={handleChange}
						defaultValue={query['area[gte]'] ? query['area[gte]'] : 0}
					/>
				</div>
				<div className="item">
					<label htmlFor="area[lte]">Max Area Size</label>
					<input
						type="number"
						id="area[lte]"
						name="area[lte]"
						placeholder="any"
						onChange={handleChange}
						defaultValue={query['area[lte]'] ? query['area[lte]'] : 'any'}
					/>
				</div>
				<div className="item">
					<label htmlFor="bedrooms">Bedrooms Number</label>
					<input
						type="number"
						id="bedrooms"
						name="bedrooms"
						placeholder="any"
						onChange={handleChange}
						defaultValue={query.bedrooms ? query.bedrooms : 'any'}
					/>
				</div>
				<div className="item">
					<label htmlFor="bathrooms">Bathrooms Number</label>
					<input
						type="number"
						id="bathrooms"
						name="bathrooms"
						placeholder="any"
						onChange={handleChange}
						defaultValue={query.bathrooms ? query.bathrooms : 'any'}
					/>
				</div>
				<div className="item">
					<label htmlFor="level">Level</label>
					<input
						type="number"
						id="level"
						name="level"
						placeholder="any"
						onChange={handleChange}
						defaultValue={query.level ? query.level : 'any'}
					/>
				</div>
				<div className="item">
					<label htmlFor="Furnished">Furnished</label>
					<select
						name="Furnished"
						id="Furnished"
						onChange={handleChange}
						defaultValue={query.Furnished ? query.Furnished : 'any'}
					>
						<option value="">any</option>
						<option value="true">Yes</option>
						<option value="false">No</option>
					</select>
				</div>
				<button onClick={handleFilter}>
					<img src="/search.png" alt="" />
				</button>
			</div>
		</div>
	);
}

export default Filter;

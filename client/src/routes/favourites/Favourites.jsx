import './favourites.scss';
import { useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import { Link } from 'react-router-dom';

function Favourites() {
  const [properties, setProperties] = useState([]);
	useEffect(() => {
		apiRequest
			.get('/properties')
			.then((res) => {
				console.log(res.data.data.data);
				setProperties(res.data.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
		return (
		<div className="favouritePage">
			<div className="details">
				<div className="wrapper">
					<div className="title">
						<h1>Saved List</h1>
					</div>
					<div className="list">
			{properties.map((item) => (
			<div className="card">
			<Link to={`/${item._id}`} className="imageContainer">
				<img src={item.images[0]} alt="" />
			</Link>
			<div className="textContainer">
				<h2 className="title">
					<Link to={`/${item._id}`}>{item.name}</Link>
				</h2>
				<p className="address">
					<img src="/pin.png" alt="" />
					<span>{item.city.city_name_en}</span>
				</p>
				<p className="price">$ {item.price}</p>
				<div className="bottom">
					<div className="features">
						<div className="feature">
							<img src="/bed.png" alt="" />
							<span>{item.bedrooms} bedroom</span>
						</div>
						<div className="feature">
							<img src="/bath.png" alt="" />
							<span>{item.bathrooms} bathroom</span>
						</div>
					</div>
					<div className="icons">
						
						<div className="icon">
							<img src="/chat.png" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>

			))}
		</div>
				</div>
			</div>
			<div className="rightPage">
			</div>
		</div>
	);
}

export default Favourites;

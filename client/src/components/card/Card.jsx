import { Link } from 'react-router-dom';
import './card.scss';

function Card({ item }) {
	return (
		<div className="card">
			<Link to={`/property/${item._id}`} className="imageContainer">
				<img src={item.images[0]} alt="" />
			</Link>
			<div className="textContainer">
				<h2 className="title">
					<Link to={`/property/${item._id}`}>{item.name}</Link>
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
						<div className="feature">
							<img src="/logo.png" alt="" />
							<span>{item.type}</span>
						</div>
						<div className="feature">
							<img src="/fee.png" alt="" />
							<span>For {item.transaction}</span>
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
	);
}

export default Card;

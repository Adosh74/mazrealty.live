import { Icon } from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import './pin.scss';

function Pin({ item }) {
	return (
		<Marker
			position={[item.latitude, item.longitude]}
			icon={
				new Icon({
					iconUrl: markerIconPng,
					iconSize: [25, 41],
					iconAnchor: [12, 41],
				})
			}
		>
			<Popup>
				<div className="popupContainer">
					<img src={item.images[0]} alt="" />
					<div className="textContainer">
						<Link to={`/property/${item._id}`}>{item.name}</Link>
						<span>{item.bedrooms} bedroom</span>
						<b>$ {item.price}</b>
					</div>
				</div>
			</Popup>
		</Marker>
	);
}

export default Pin;

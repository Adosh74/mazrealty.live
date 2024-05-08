import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import Pin from '../pin/Pin';
import './map.scss';

function Map({ items }) {
	return (
		<MapContainer
			center={
				items.length === 1 ? [items[0].latitude, items[0].longitude] : [27.5, 31]
			}
			zoom={items.length === 1 ? 15 : 6}
			scrollWheelZoom={false}
			className="map"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{items.map((item) => (
				<Pin item={item} key={item._id} />
			))}
		</MapContainer>
	);
}

export default Map;

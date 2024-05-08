import DOMPurify from 'dompurify';
import { useLoaderData } from 'react-router-dom';
import Map from '../../components/map/Map';
import Slider from '../../components/slider/Slider';
import './singlePage.scss';

function SinglePage() {
	const property = useLoaderData();

	return (
		<div className="singlePage">
			<div className="details">
				<div className="wrapper">
					<Slider images={property.images} />
					<div className="info">
						<div className="top">
							<div className="post">
								<h1>{property.name}</h1>
								<div className="address">
									<img src="/pin.png" alt="" />
									<span>{property.city.city_name_en}</span>
								</div>
								{/* address details */}
								<div className="address">
									<span>{property.address}</span>
								</div>
								<div className="price">$ {property.price}</div>
							</div>
							<div className="user">
								<img src="/default.jpg" alt="" />
								<span>{property.owner.name}</span>
							</div>
						</div>
						<div
							className="bottom"
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(property.description),
							}}
						></div>
					</div>
				</div>
			</div>
			<div className="features">
				<div className="wrapper">
					<p className="title">General</p>
					<div className="listVertical">
						<div className="feature">
							<img src="/fee.png" alt="" />
							<div className="featureText">
								<span>Transaction Type</span>
								<p>{property.transaction}</p>
							</div>
						</div>
						<div className="feature">
							<img src="/utility.png" alt="" />
							<div className="featureText">
								<span>Furnished</span>
								<p>{property.Furnished ? 'Yes' : 'No'}</p>
							</div>
						</div>
						<div className="feature">
							<img src="/logo.png" alt="" />
							<div className="featureText">
								<span>Property Type</span>
								<p>{property.type}</p>
							</div>
						</div>
					</div>
					<p className="title">Sizes</p>
					<div className="sizes">
						<div className="size">
							<img src="/size.png" alt="" />
							<span>{property.area} (Sq. M.)</span>
						</div>
						<div className="size">
							<img src="/bed.png" alt="" />
							<span>{property.bedrooms} beds</span>
						</div>
						<div className="size">
							<img src="/bath.png" alt="" />
							<span>{property.bathrooms} bathroom</span>
						</div>
					</div>
					{/* <p className="title">Nearby Places</p>
					<div className="listHorizontal">
						<div className="feature">
							<img src="/school.png" alt="" />
							<div className="featureText">
								<span>School</span>
								<p>250m away</p>
							</div>
						</div>
						<div className="feature">
							<img src="/pet.png" alt="" />
							<div className="featureText">
								<span>Bus Stop</span>
								<p>100m away</p>
							</div>
						</div>
						<div className="feature">
							<img src="/fee.png" alt="" />
							<div className="featureText">
								<span>Restaurant</span>
								<p>200m away</p>
							</div>
						</div>
					</div> */}
					<p className="title">Location</p>
					<div className="mapContainer">
						<Map items={[property]} />
					</div>
					<div className="buttons">
						<button>
							<img src="/chat.png" alt="" />
							Send a Message
						</button>
						<button>
							<img src="/save.png" alt="" />
							Save the Place
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SinglePage;

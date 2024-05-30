import DOMPurify from 'dompurify';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Map from '../../components/map/Map';
import Slider from '../../components/slider/Slider';
import { AuthContext } from '../../context/authContext';
import apiRequest from '../../lib/apiRequest';
import './singlePage.scss';

function SinglePage() {
	const property = useLoaderData();
	const [fav, setFav] = useState(property ? property.isFav : false);
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();
	if (!property) {
		return (
			<div className="pageNotFound">
				<h1>
					<span>404</span> - Property Not Found
				</h1>
				<p>The page you are looking for does not exist.</p>
			</div>
		);
	}

	const handleSave = async () => {
		if (!currentUser) {
			toast.error('You need to login first', {
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
			setTimeout(() => {
				navigate('/login');
			}, 2000);
		} else {
			try {
				const res = await apiRequest.post(`/favorites/${property._id}`);
				if (res.status === 201) {
					setFav(!fav);
					toast.success('Property saved successfully', {
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
				}
				if (res.status === 204) {
					setFav(!fav);
					toast.success('Property removed from favorites', {
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
				}
			} catch (error) {
				toast.error('Something went wrong', {
					style: {
						border: '1px solid #713200',
						padding: '16px',
						paddingLeft: '25px',
						paddingRight: '25px',
						color: '#713200',
					},
				});
			}
		}
	};

	const deleteProperty = async () => {
		if (window.confirm("Are you sure you want to delete this property?")) {
			try {
				const res = await apiRequest.delete(`/properties/${property._id}`);
				if (res.status === 204) {
					toast.success('The property has been deleted', {
						style: {
							borderRadius: '10px',
							background: '#333',
							color: '#fff',
						},
					});
					navigate('/profile');
				} else {
					toast.error('Failed to delete property');
				}
			} catch (error) {
				console.log(error);
				toast.error('Something went wrong');
			}
		}
	};
	return (
		<div className="singlePage">
			<div className="details">
				{((currentUser && currentUser._id === property.owner._id) ||
					(currentUser && currentUser.role === 'admin')) && (
					<div className="ownerButtons">
						<button onClick={deleteProperty} className="deleteProperty">
							Delete property
						</button>
						<Link to={`/edit/property/${property._id}`}>
							<button className="editProperty">Edit property</button>
						</Link>
					</div>
				)}

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
								<img
									src={property.owner.photo || '/default.jpg'}
									alt=""
								/>
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
					<p className="title">Location</p>
					<div className="mapContainer">
						<Map items={[property]} />
					</div>
					<div className="buttons">
						<button>
							<img src="/chat.png" alt="" />
							Send a Message
						</button>
						<button
							onClick={handleSave}
							style={{
								backgroundColor: fav ? '#fece51' : 'white',
							}}
						>
							<img src="/save.png" alt="" />
							{fav ? 'Property Saved' : 'Save the Property'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SinglePage;

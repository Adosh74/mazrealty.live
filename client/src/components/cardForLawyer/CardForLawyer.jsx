import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Trash2, Eye, BookCheck, Phone, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import './cardForLawyer.scss';

function CardForLawyer({ item, bookId }) {
	const navigate = useNavigate();

	// render the component after the property has been rejected
	useEffect(() => {
		if (item.isRejected) {
			toast.success('It has been rejected', {
				style: {
					borderRadius: '10px',
					background: '#333',
					color: '#fff',
				},
			});
		}
	}, [item.isRejected]);

	const handelReject = async (propertyId) => {
		try {
			await apiRequest.patch(`/lawyers/reject-property/${bookId}`);
			toast.success('Feedback sent to the user ✔', {
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
			// reload the page after the property has been rejected
			navigate(`/property/${propertyId}`);
		} catch (error) {
			console.log(error);
			toast.error('Failed to reject property', {
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
		}
	};

	const handelAccept = async (propertyId) => {
		try {
			await apiRequest.patch(`/lawyers/approve-property/${bookId}`);
			toast.success('Feedback sent to the user ✔', {
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

			navigate(`/property/${propertyId}`);
		} catch (error) {
			console.log(error);
			toast.error('Failed to accept property', {
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
		}
	};

	const handleViewContract = (contractUrl) => {
		// popup window to view contract
		window.open(contractUrl, '_blank');
	};

	return (
		<div className="cardLawyer">
			<div className="leftCard">
				<Link to={`/property/${item._id}`} className="imageContainer">
					<img src={item.images[0]} alt="" />
				</Link>
				<div className="cardLeft">
					<h2 className="title">
						<Link to={`/property/${item._id}`}>{item.name}</Link>
					</h2>
					<p className="address">
						<img src="/pin.png" alt="" />
						<span>{item.address}</span>
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
						{/* <div className="icons">
							<div className="icon">
								<img src="/chat.png" alt="" />
							</div>
						</div> */}
					</div>
				</div>
				<div className="cardRight">
					<button
						onClick={() => handelReject(item._id)}
						className="rejectButton"
					>
						<div></div>
						<Trash2 />
					</button>
					<button
						onClick={() => handelAccept(item._id)}
						className="acceptButton"
					>
						<BookCheck />
					</button>
					<Link to={item.img}>
						<button
							className="viewButton"
							onClick={() => handleViewContract(item.contract)}
						>
							<Eye />
							<span>view contract</span>
						</button>
					</Link>
				</div>
			</div>
			<div className="user">
				<img src={item.owner.photo || '/default.jpg'} alt="" />
				<span>{item.owner.name}</span>
				<ButtonGroup variant="outlined" aria-label="Basic button group">
					<Button
						onClick={() => {
							// move to other page
							// https://wa.me/2${item.owner.phone}
							console.log(`2${item.owner.phone}`);
							window.open(`https://wa.me/2${item.owner.phone}`);
						}}
						color="success"
					>
						{' '}
						<MessageCircle />
					</Button>
					<Button
						onClick={() => {
							// move to call to phone
							window.open(`tel:${item.owner.phone}`);
						}}
						color="inherit"
					>
						<Phone />
					</Button>
				</ButtonGroup>
			</div>
		</div>
	);
}

export default CardForLawyer;

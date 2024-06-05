import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CardForLawyer from '../../components/cardForLawyer/CardForLawyer';
import apiRequest from '../../lib/apiRequest';
import './LawyerPage.scss';

function LawyerPage() {
	const [properties, setProperties] = useState([]);

	useEffect(() => {
		const getProperties = async () => {
			try {
				const res = await apiRequest.get('/lawyers/not-approved');
				setProperties(res.data.data.notRespondedBookings);
			} catch (error) {
				console.log(error);
				toast.error(`${error.response.data.message}`, {
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
		getProperties();
	}, []);

	if (properties.length === 0) {
		return (
			<div className="empty">
				<p>No properties to review contract for now! &nbsp;</p>
			</div>
		);
	}

	return (
		<div className="lawyerPage">
			<div className="list">
				{properties.map((item) => (
					<CardForLawyer
						key={item._id}
						item={item.property}
						bookId={item._id}
					/>
				))}
			</div>
		</div>
	);
}

export default LawyerPage;

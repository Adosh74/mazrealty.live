import { useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import Card from '../card/Card';
import './list.scss';

function List() {
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
		<div className="list">
			{properties.map((item) => (
				<Card key={item._id} item={item} />
			))}
		</div>
	);
}

export default List;

import Card from '../card/Card';
import './list.scss';

function List({ items }) {
	return (
		<div className="list">
			{items.map((item) => (
				<Card key={item._id} item={item} />
			))}
		</div>
	);
}

export default List;

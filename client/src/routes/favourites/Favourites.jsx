import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Card from '../../components/card/Card';
import Map from '../../components/map/Map';
import './favourites.scss';

function Favourites() {
	const data = useLoaderData();
	return (
		<div className="favouritePage">
			<div className="details">
				<div className="wrapper">
					<div className="title">
						<h1>Saved List</h1>
					</div>
					<Suspense fallback={<div>Loading...</div>}>
						<Await
							resolve={data.favorites}
							errorElement={<div>Failed to load properties</div>}
						>
							{(favorites) => {
								if (favorites.length === 0) {
									return <h1>No properties found</h1>;
								} else {
									return favorites.map((favorite) => (
										<Card
											key={favorite._id}
											item={favorite.property}
										/>
									));
								}
							}}
						</Await>
					</Suspense>
				</div>
			</div>
			<div className="rightPage">
				<Suspense
					fallback={
						<div className="loading">
							<h1>Loading...</h1>
						</div>
					}
				>
					<Await
						resolve={data.favorites}
						errorElement={<p>Failed to load properties</p>}
					>
						{(favorites) => {
							const properties = favorites.map(
								(favorite) => favorite.property
							);
							return <Map items={properties} />;
						}}
					</Await>
				</Suspense>
			</div>
		</div>
	);
}

export default Favourites;

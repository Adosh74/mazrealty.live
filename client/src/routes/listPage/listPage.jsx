import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Card from '../../components/card/Card';
import Filter from '../../components/filter/Filter';
import Map from '../../components/map/Map';
import './listPage.scss';

function ListPage() {
	// get properties from loader
	const data = useLoaderData();
	return (
		<div className="listPage">
			<div className="listContainer">
				<div className="wrapper">
					<Filter />
					<Suspense
						fallback={
							<div className="loading">
								<h1>Loading...</h1>
							</div>
						}
					>
						<Await
							resolve={data.properties}
							errorElement={<p>Error loading properties</p>}
						>
							{(properties) => {
								if (properties.length === 0) {
									return <h1>No properties found</h1>;
								} else {
									return properties.map((property) => (
										<Card key={property._id} item={property} />
									));
								}
							}}
						</Await>
					</Suspense>
				</div>
			</div>
			<div className="mapContainer">
				<Suspense
					fallback={
						<div className="loading">
							<h1>Loading...</h1>
						</div>
					}
				>
					<Await
						resolve={data.properties}
						errorElement={<p>Error loading properties</p>}
					>
						{(properties) => <Map items={properties} />}
					</Await>
				</Suspense>
			</div>
		</div>
	);
}

export default ListPage;

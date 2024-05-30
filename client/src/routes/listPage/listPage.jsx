import { Suspense, useRef, useState } from 'react';
import { Await, useLoaderData, useSearchParams } from 'react-router-dom';
import Card from '../../components/card/Card';
import Filter from '../../components/filter/Filter';
import Map from '../../components/map/Map';
import './listPage.scss';

function ListPage() {
	// get properties from loader
	const data = useLoaderData();
	const [params, setParams] = useSearchParams();

	const pageTopOf = useRef();
	// get params from url
	const nexPage = () => {
		const page = params.get('page') ? parseInt(params.get('page')) : 1;
		const obj = {};
		for (const key of params.keys()) {
			obj[key] = params.get(key);
		}
		obj.page = page + 1;
		// scroll to top
		pageTopOf.current?.scrollIntoView({ behavior: 'smooth' });
		setParams(obj);
	};
	const prevPage = () => {
		const page = params.get('page') ? parseInt(params.get('page')) : 1;
		const obj = {};
		for (const key of params.keys()) {
			obj[key] = params.get(key);
		}
		obj.page = page - 1;
		// scroll to top

		setParams(obj);
	};
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
									// return properties.map((property) => (
									// 	<Card key={property._id} item={property} />
									// ));
									// pagination
									return (
										<>
											{properties.map((property) => (
												<Card
													key={property._id}
													item={property}
												/>
											))}
											<div className="pagination">
												{params.get('page') > 1 && (
													<button onClick={prevPage}>
														Prev
													</button>
												)}
												<p>{params.get('page') || 1}</p>
												{properties.length === 20 && (
													<>
														<button onClick={nexPage}>
															Next
														</button>
													</>
												)}
											</div>
										</>
									);
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

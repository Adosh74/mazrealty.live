import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { ArrowBigUpDash, ArrowBigDownDash, RefreshCwOff, SmilePlus } from 'lucide-react';
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
							<Box sx={{ width: 1100 }}>
								<Skeleton />
								<Skeleton animation="wave" />
								<Skeleton />
							</Box>
						}
					>
						<Await
							resolve={data.properties}
							errorElement={
								<div className="error-message">
									<p>Error loading properties &nbsp;</p>
									<RefreshCwOff />
								</div>
							}
						>
							{(properties) => {
								if (properties.length === 0) {
									return (
										<div className="no-properties">
											<p>No properties found &nbsp;</p>
											<SmilePlus />
										</div>
									);
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
													<Button
														variant="outlined"
														color="info"
														onClick={prevPage}
													>
														<ArrowBigUpDash />
													</Button>
												)}
												<p>{params.get('page') || 1}</p>
												{properties.length === 20 && (
													<>
														<Button
															variant="contained"
															color="info"
															onClick={nexPage}
														>
															<ArrowBigDownDash />
														</Button>
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
						<Box sx={{ width: 700 }}>
							<Skeleton />
							<Skeleton animation="wave" />
							<Skeleton />
						</Box>
					}
				>
					<Await
						resolve={data.properties}
						errorElement={
							<div className="error-message">
								<p>Error loading properties &nbsp;</p>
								<RefreshCwOff />
							</div>
						}
					>
						{(properties) => <Map items={properties} />}
					</Await>
				</Suspense>
			</div>
		</div>
	);
}

export default ListPage;

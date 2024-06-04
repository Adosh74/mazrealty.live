import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { SmilePlus, RefreshCwOff } from 'lucide-react';
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
					<Suspense
						fallback={
							<Box sx={{ width: 1000 }}>
								<Skeleton />
								<Skeleton animation="wave" />
								<Skeleton />
							</Box>
						}
					>
						<Await
							resolve={data.favorites}
							errorElement={
								<div className="error-message">
									<p>Error loading properties &nbsp;</p>
									<RefreshCwOff />
								</div>
							}
						>
							{(favorites) => {
								if (favorites.length === 0) {
									return (
										<div className="no-properties">
											<p>No properties found &nbsp;</p>
											<SmilePlus />
										</div>
									);
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
						<Box sx={{ width: 600 }}>
							<Skeleton />
							<Skeleton animation="wave" />
							<Skeleton />
						</Box>
					}
				>
					<Await resolve={data.favorites} errorElement={<></>}>
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

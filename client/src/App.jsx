import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { singlePageLoader, listPageLoader } from './lib/loaders';
import EditProperty from './routes/editMyProperty/editMyProperty';
import HomePage from './routes/homePage/homePage';
import { Layout, RequireAuth } from './routes/layout/layout';
import ListPage from './routes/listPage/listPage';
import Login from './routes/login/login';
import NewPostPage from './routes/newPostPage/newPostPage';
import ProfilePage from './routes/profilePage/profilePage';
import ProfileUpdatePage from './routes/profileUpdatePage/profileUpdatePage';
import Register from './routes/register/register';
import SinglePage from './routes/singlePage/singlePage';
import LawyerPage from './routes/lawyerPage/LawyerPage';
import PageNotFound from './routes/pageNotFound/PageNotFound';
import Favourites from './routes/favourites/Favourites';
import {Toaster} from "react-hot-toast";

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					path: '/',
					element: <HomePage />,
				},
				{
					path: '/list',
					element: <ListPage />,
					loader: listPageLoader,
				},
				{
					path: '/:id',
					element: <SinglePage />,
					loader: singlePageLoader,
				},
				{
					path: '/login',
					element: <Login />,
				},
				{
					path: '/register',
					element: <Register />,
				},
			],
		},
		{
			path: '/',
			element: <RequireAuth />,
			children: [
				{
					path: '/profile',
					element: <ProfilePage />,
				},
				{
					path: '/profile/update',
					element: <ProfileUpdatePage />,
				},
				{
					path: '/add',
					element: <NewPostPage />,
				},
				{
					path: '/edit/property/:id',
					element: <EditProperty />,
				},
				{
					path: '/lawyer',
					element: <LawyerPage />,
				},
				,
				{
					path: '/favourites',
					element: <Favourites />,
				},
			],
		},
		{
			path: '*',
			element: <PageNotFound />,
			
		},
	]);

	return (<><RouterProvider router={router} /><Toaster />
</>);
}

export default App;

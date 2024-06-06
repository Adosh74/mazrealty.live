import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	singlePageLoader,
	listPageLoader,
	myFavoritesLoader,
	myPropertiesLoader,
} from './lib/loaders';
import About from './routes/about/About';
import EditProperty from './routes/editMyProperty/editMyProperty';
import Favourites from './routes/favourites/Favourites';
import HomePage from './routes/homePage/homePage';
import LawyerPage from './routes/lawyerPage/LawyerPage';
import { Layout, RequireAdminOrLayer, RequireAuth } from './routes/layout/layout';
import ListPage from './routes/listPage/listPage';
import Login from './routes/login/login';
import NewPostPage from './routes/newPostPage/newPostPage';
import PageNotFound from './routes/pageNotFound/PageNotFound';
import ProfilePage from './routes/profilePage/profilePage';
import ProfileUpdatePage from './routes/profileUpdatePage/profileUpdatePage';
import Register from './routes/register/register';
import SinglePage from './routes/singlePage/singlePage';
import SuccessBook from './routes/successBook/successBook';

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
					path: 'property/:id',
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
				{
					path: '/about',
					element: <About />,
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
					loader: myPropertiesLoader,
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
					path: '/favourites',
					element: <Favourites />,
					loader: myFavoritesLoader,
				},
				{
					path: '/success-book',
					element: <SuccessBook />,
				},
			],
		},
		{
			path: '/',
			element: <RequireAdminOrLayer />,
			children: [
				{
					path: '/lawyer',
					element: <LawyerPage />,
				},
			],
		},
		{
			path: '*',
			element: <PageNotFound />,
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
			<Toaster />
		</>
	);
}

export default App;

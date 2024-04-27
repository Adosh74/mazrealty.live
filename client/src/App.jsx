import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './routes/homePage/homePage';
import { Layout, RequireAuth } from './routes/layout/layout';
import ListPage from './routes/listPage/listPage';
import Login from './routes/login/login';
import ProfilePage from './routes/profilePage/profilePage';
import ProfileUpdatePage from './routes/profileUpdatePage/profileUpdatePage';
import Register from './routes/register/register';
import SinglePage from './routes/singlePage/singlePage';

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
				},
				{
					path: '/:id',
					element: <SinglePage />,
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
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;

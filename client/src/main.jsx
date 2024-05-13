import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthContextProvider } from './context/authContext.jsx';
import { SocketContextProvider } from './context/socketContext.jsx';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthContextProvider>
			<SocketContextProvider>
				<App />
			</SocketContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import './successBook.scss';

function SuccessBook() {
	// keep user in this page 40 seconds and navigate to home
	const navigate = useNavigate();
	setTimeout(() => {
		navigate('/');
	}, 15000);

	return (
		<div className="success-book-page">
			<Stack sx={{ width: '100%' }} spacing={2}>
				<Alert severity="success">
					<AlertTitle>Success</AlertTitle>
					The contract will be reviewed by the lawyer, and a response will be
					made within 48 hours via your email.
				</Alert>
			</Stack>
		</div>
	);
}

export default SuccessBook;

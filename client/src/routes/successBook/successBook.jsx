import "./successBook.scss"
import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function SuccessBook() {
	
	return (
		<div className="success-book-page">
 <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
              The contract will be reviewed by the lawyer, and a response will be made within 48 hours via your email.
      </Alert>
    </Stack>
    
		</div>
	);
}

export default SuccessBook;

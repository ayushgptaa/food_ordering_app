import { forwardRef } from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/* eslint-disable react/prop-types */
const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar({ open, severity, handleClose, message }) {
  return (
    <MuiSnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} sx={{ width: '100%' }} severity={severity}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
}

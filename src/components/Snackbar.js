import { forwardRef } from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/* eslint-disable react/prop-types */
const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar({ open, varient, inputval, handleClose }) {
  return (
    <MuiSnackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={varient}
        sx={{ width: '100%', backgroundColor: 'success.main' }}
      >
        {inputval} Added to the Categories
      </Alert>
    </MuiSnackbar>
  );
}

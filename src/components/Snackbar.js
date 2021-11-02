import { useState, forwardRef } from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar({ open, varient, inputval, handleClose }) {
  //   const handleClose = (event, reason) => {
  //     if (reason === 'clickaway') {
  //       return;
  //     }

  //     setOpen(false);
  //   };

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

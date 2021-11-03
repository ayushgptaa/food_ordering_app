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
      <Alert onClose={handleClose} sx={{ width: '100%' }} severity={varient}>
        {varient === 'success'
          ? `${inputval} added to the Categories :)`
          : `Unable to add  ${inputval} to Categories. Try again :(`}
      </Alert>
    </MuiSnackbar>
  );
}

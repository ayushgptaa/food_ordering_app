/* eslint-disable camelcase */
import { useState } from 'react';
// material
import { Typography, Box, Button, Slider } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
// components
import Fetch from 'src/components/_dashboard/Menu/Fetch';

import SnackBar from 'src/components/Snackbar';

const PrettoSlider = styled(Slider)(({ theme }) => ({
  height: 5,
  '& .MuiSlider-track': {
    border: 'none'
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    },
    '&:before': {
      display: 'none'
    }
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 20,
    background: 'unset',
    padding: 0,
    width: 35,
    height: 35,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: theme.palette.primary.main,
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
    },
    '& > *': {
      transform: 'rotate(45deg)'
    }
  }
}));

// --------------------------------------------------------

export default function SliderBox({ name, text, marks, max, min, defaultValue, endpoint }) {
  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ open: false });
  };
  // ************** SET CUSTOMER DISCOUNT FUNCTION ***************** //
  const setSlider = async () => {
    const data = {
      store_id:
        'store_ITi5BP3FmPa7gyMYgbNVXM9PdD0jsC2avDxYbETsXJ56vmAEFdAwVQaVoCoeXEKl92wY30Z52QXo9NMnk55pY2ReizFeLRo7v0Gx1635-720184-2931',
      ...input
    };
    Fetch(data, endpoint)
      .then(() => {
        setSnackbar({
          severity: 'success',
          open: true,
          message: `Successfully Changed the value :)`
        });
      })
      .catch(() => {
        setSnackbar({
          severity: 'error',
          open: true,
          message: 'Unable to change the value. Try again :( '
        });
      });
  };

  const [input, setInput] = useState({});
  const [snackbar, setSnackbar] = useState({ severity: 'success', open: false, message: '' });
  const inputhandler = (e) => {
    setInput({ [e.target.name]: Number(e.target.value) });
  };

  return (
    <>
      <Box
        sx={{
          py: 4,
          pt: 2,
          px: 5,
          width: { md: 500, xs: 300 },
          backgroundColor: 'background.paper',
          borderRadius: 2,
          m: 2,
          textAlign: 'center',
          boxShadow: 2
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ textAlign: 'center', opacity: 0.8, mb: 7 }}>
          {text}
        </Typography>
        <PrettoSlider
          name={name}
          key={`slider-${defaultValue}`}
          aria-label="Custom marks"
          marks={marks}
          valueLabelDisplay="on"
          min={min}
          max={max}
          defaultValue={defaultValue}
          onChange={inputhandler}
        />
        <Button variant="contained" sx={{ py: 1, px: 4 }} onClick={() => setSlider(endpoint)}>
          SAVE
        </Button>
        <SnackBar
          open={snackbar.open}
          severity={snackbar.severity}
          handleClose={closeSnackbar}
          message={snackbar.message}
        />
      </Box>
    </>
  );
}

SliderBox.propTypes = {
  name: PropTypes.string,
  endpoint: PropTypes.string,
  text: PropTypes.string,
  marks: PropTypes.array,
  max: PropTypes.number,
  min: PropTypes.number,
  defaultValue: PropTypes.number
};

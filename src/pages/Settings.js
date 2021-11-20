// material
import { Typography, Card, Box, Button, Stack, Slider } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const Discount = [
  {
    value: 0,
    label: '0%'
  },

  {
    value: 25,
    label: '25%'
  }
];

const Commission = [
  {
    value: 0,
    label: '0%'
  },

  {
    value: 5,
    label: '5%'
  }
];

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
    fontSize: 15,
    background: 'unset',
    padding: 0,
    width: 40,
    height: 40,
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

export default function Settings() {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
      <SliderBox text="Customer Discount" marks={Discount} max={25} defaultValue={5} />
      <SliderBox text="Affiliate Commission" marks={Commission} max={5} defaultValue={1} />
    </Stack>
  );
}

SliderBox.propTypes = {
  text: PropTypes.string
};

function SliderBox({ text, marks, max, defaultValue }) {
  return (
    <>
      <Box
        sx={{
          py: 4,
          px: 5,
          width: { md: 500, xs: 300 },
          backgroundColor: 'background.paper',
          borderRadius: 2,
          m: 2,
          textAlign: 'center',
          boxShadow: 2
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ textAlign: 'center', opacity: 0.8, mb: 2 }}>
          {text}
        </Typography>
        <PrettoSlider
          aria-label="Custom marks"
          marks={marks}
          valueLabelDisplay="auto"
          min={0}
          max={max}
          defaultValue={defaultValue}
        />
        <Button variant="contained" sx={{ py: 1, px: 4 }}>
          SAVE
        </Button>
      </Box>
    </>
  );
}

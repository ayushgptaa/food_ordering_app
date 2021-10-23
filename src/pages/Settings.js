// material
import { Typography, Card, Box, Button, Stack, Slider } from '@mui/material';
import PropTypes from 'prop-types';
// ----------------------------------------------------------------------

const marks = [
  {
    value: 0,
    label: '0%'
  },

  {
    value: 25,
    label: '25%'
  }
];

export default function Settings() {
  return (
    <Card sx={{ py: 6, maxWidth: 'md', mx: 'auto', mt: { md: 2 }, mb: 0 }}>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <SliderBox text="Custom Discount" />
        <SliderBox text="Affiliate Discount" />
      </Stack>
    </Card>
  );
}

SliderBox.propTypes = {
  text: PropTypes.string
};

function SliderBox({ text }) {
  return (
    <>
      <Box
        sx={{
          color: 'primary.darker',
          py: 3,
          px: 5,
          width: { md: 500, xs: 300 },
          backgroundColor: 'primary.lighter',
          borderRadius: 2,
          m: 2,
          textAlign: 'center'
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ textAlign: 'left' }}>
          {text}
        </Typography>
        <Slider aria-label="Custom marks" marks={marks} valueLabelDisplay="auto" min={0} max={25} />
        <Button variant="contained" sx={{ py: 1, px: 4 }}>
          SAVE
        </Button>
      </Box>
    </>
  );
}

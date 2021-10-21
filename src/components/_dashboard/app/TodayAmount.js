// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

// ----------------------------------------------------------------------

const TOTAL = 4050;

export default function TodayAmount() {
  return (
    <RootStyle>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        TODAY AMOUNT
      </Typography>
      <Typography variant="h3">${TOTAL}</Typography>
    </RootStyle>
  );
}

// material
import { Container, Grid, Typography, Card, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(7, 0),
  margin: theme.spacing(2, 2),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px'
}));

const DownloadIcon = () => <Icon icon="bx:bxs-download" color="white" />;

export default function Promote() {
  return (
    <Card sx={{ py: 6, maxWidth: 'md', mx: 'auto', mt: { md: 5 }, mb: 0 }}>
      <Grid container spacing={3} direction="row" justifyContent="space-evenly" alignItems="center">
        <Grid item xs={12} sm={6} md={5}>
          <RootStyle>
            <Box component="img" src="/static/QRcode.svg" sx={{ width: 90 }} />
            <Typography variant="h5" sx={{ opacity: 0.72 }}>
              QR code
            </Typography>

            <Button variant="contained" sx={{ py: 1, px: 4 }} endIcon={<DownloadIcon />}>
              Download
            </Button>
          </RootStyle>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <RootStyle>
            {/* <Box component="img" src="/static/QRcode.svg" sx={{ width: 80 }} /> */}
            <Icon icon="carbon:template" width="90" />
            <Typography variant="h5" sx={{ opacity: 0.72 }}>
              Template
            </Typography>
            <Button variant="contained" sx={{ py: 1, px: 4 }} endIcon={<DownloadIcon />}>
              Download
            </Button>
          </RootStyle>
        </Grid>
      </Grid>
    </Card>
  );
}

// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { TodayAmount, TodayOrders, TotalOrders, TotalAmount } from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        {/* <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box> */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <TodayAmount />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TodayOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TotalAmount />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TotalOrders />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

// material
import { Grid, Container } from '@mui/material';
import PageTitle from 'src/components/PageTitle';
// components
import { TodayAmount, TodayOrders, TotalOrders, TotalAmount } from '../components/_dashboard/app';
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard ">
      <Container maxWidth="xl">
        <PageTitle title="Hi, Welcome back" />
        <Grid container spacing={3} sx={{ mt: { xs: 2, md: 0 } }}>
          <Grid item xs={12} sm={6}>
            <TodayAmount />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TodayOrders />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TotalAmount />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TotalOrders />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

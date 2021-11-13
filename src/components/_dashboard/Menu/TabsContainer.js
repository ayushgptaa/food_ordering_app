/* eslint-disable camelcase */
import { Grid, Box } from '@mui/material';
import TabsHeading from './Tabs/TabsHeading';

export default function TabsContainer({ Heading, children, margintop }) {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        maxWidth: 450,
        mx: 'auto',
        mt: 1
      }}
    >
      <TabsHeading Heading={Heading} />
      <Box
        sx={{
          width: '100%'
        }}
      >
        {children}
      </Box>
    </Grid>
  );
}

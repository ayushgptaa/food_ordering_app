/* eslint-disable camelcase */
import { Grid, Box } from '@mui/material';
import TabsHeading from './Tabs/TabsHeading';

export default function TabsContainer({ Heading, children }) {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        maxWidth: 350,
        mx: 'auto'
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

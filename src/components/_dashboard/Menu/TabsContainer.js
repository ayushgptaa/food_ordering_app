import { Grid, Box } from '@mui/material';
import PropTypes from 'prop-types';
import TabsHeading from './Tabs/TabsHeading';

// -------------------------------------------------------

TabsContainer.propTypes = {
  Heading: PropTypes.string,
  children: PropTypes.node
};

export default function TabsContainer({ Heading, children }) {
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

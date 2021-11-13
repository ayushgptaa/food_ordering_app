import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

TabsHeading.propTypes = {
  Heading: PropTypes.string
};
export default function TabsHeading({ Heading }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ maxWidth: 'md', mx: 'auto', mt: 1.5 }}
    >
      <Typography
        variant="h4"
        component="span"
        sx={{ opacity: 0.72, textAlign: 'center' }}
        gutterBottom
      >
        {Heading}
      </Typography>
    </Grid>
  );
}

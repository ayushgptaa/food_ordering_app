// material
import { Box, Typography } from '@mui/material';

import PropTypes from 'prop-types';

PageTitle.propTypes = {
  title: PropTypes.string
};

// ------------------------------------------------

export default function PageTitle({ title }) {
  return (
    <Box
      sx={{
        textAlign: { xs: 'center' }
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ mb: 2, opacity: 0.7 }}>
        {title}
      </Typography>
    </Box>
  );
}

// import { Icon } from '@iconify/react';
// import plusFill from '@iconify/icons-eva/plus-fill';
// import { Link as RouterLink } from 'react-router-dom';
// // material
// import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// // components
// // import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
// //
// import POSTS from '../_mocks_/blog';

// // ----------------------------------------------------------------------

// const SORT_OPTIONS = [
//   { value: 'latest', label: 'Latest' },
//   { value: 'popular', label: 'Popular' },
//   { value: 'oldest', label: 'Oldest' }
// ];

// // ----------------------------------------------------------------------

// export default function AddMenu() {

//   return (
//     <Page title="Dashboard: Add Menu ">

//     </Page>
//   );
// }

import * as React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Page from '../components/Page';

// // ----------------------------------------------------------------------

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Dashboard: Add Menu ">
      <Container>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Add Category" {...a11yProps(0)} />
              <Tab label="Add Items" {...a11yProps(1)} />
              <Tab label="Add Options" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
      </Container>
    </Page>
  );
}

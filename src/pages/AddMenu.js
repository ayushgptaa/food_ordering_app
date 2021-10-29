import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Container,
  Tab,
  Tabs,
  // TextField,
  Box
  // Button,
  // Grid,
  // InboxIcon,
  // ListItemIcon,
  // ListItem,
  // ListItemButton,
  // ListItemText,
  // List,
  // Divider
} from '@mui/material';
// import { typography } from '@mui/system';
import Page from '../components/Page';
import AddItem from '../components/_dashboard/Addmenu/additem';
import AddCategory from '../components/_dashboard/Addmenu/addcartegory';

// // ----------------------------------------------------------------------

const commonTabstyle = {
  fontSize: 'subtitle1.fontSize'
};
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
      {value === index && <Box sx={{ p: { md: 5, xs: 2 } }}>{children}</Box>}
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
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    console.log('handlechange', newValue);
    setValue(newValue);
  };

  return (
    <Page title="Dashboard: Add Menu ">
      <Container>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Menu tabs"
              sx={{ '> Tab': { fontSize: 'h5.fontSize' } }}
              centered
            >
              <Tab label="Add Category" sx={{ ...commonTabstyle }} {...a11yProps(0)} />
              <Tab label="Add Items" sx={{ ...commonTabstyle }} {...a11yProps(1)} />
              <Tab label="Add Options" sx={{ ...commonTabstyle }} {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AddCategory />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddItem />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
      </Container>
    </Page>
  );
}

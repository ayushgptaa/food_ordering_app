import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CreateOptionGroup from './SubTabs/CreateOptionGroup';
import AddOptionGroup from './SubTabs/AddOptionGroup';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

export default function Option() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Create Option Group" {...a11yProps(0)} sx={{ fontSize: 'h6.fontSize' }} />
          <Tab
            label="Add Option Group to Item"
            {...a11yProps(1)}
            sx={{ fontSize: 'h6.fontSize' }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CreateOptionGroup />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddOptionGroup />
      </TabPanel>
    </Box>
  );
}

import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Tab,
  Tabs,
  TextField,
  Box,
  Button,
  Grid,
  InboxIcon,
  ListItemIcon,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Divider
} from '@mui/material';
// import { typography } from '@mui/system';
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
      {value === index && <Box sx={{ p: 5 }}>{children}</Box>}
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
            <Tabs value={value} onChange={handleChange} aria-label="Menu tabs" centered="true">
              <Tab label="Add Category" {...a11yProps(0)} />
              <Tab label="Add Items" {...a11yProps(1)} />
              <Tab label="Add Options" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid
              component="form"
              container
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' }
              }}
              noValidate
              autoComplete="off"
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <TextField id="outlined-basic" label="Enter Category" variant="outlined" />
              <Button variant="contained" sx={{ py: 2, fontSize: 'subtitle1.fontSize' }}>
                ADD
              </Button>
            </Grid>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Trash" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#simple-list">
                    <ListItemText primary="Spam" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
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

import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Tab, Tabs, Box } from '@mui/material';
import AddItem from 'src/components/_dashboard/Menu/Tabs/AddItem';
import PublishedMenu from 'src/components/_dashboard/Menu/Tabs/PublishedMenu';
import ViewMenu from 'src/components/_dashboard/Menu/Tabs/ViewMenu';
import AddOption from 'src/components/_dashboard/Menu/Tabs//Option/Option';
import AddCategory from 'src/components/_dashboard/Menu/Tabs/AddCategory';
import { MenuContext } from 'src/components/_dashboard/Menu/MenuStore/Context-Provider';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const commonTabstyle = {
  fontSize: 'h5.fontSize'
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
const MenuTabs = [
  { label: 'Published Menu' },
  {
    label: 'Draft Menu'
  },
  {
    label: 'Add Category'
  },
  {
    label: 'Add Item'
  },
  {
    label: 'Options'
  }
];
export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const { getMenu, getDraftMenu } = useContext(MenuContext);
  useEffect(() => {
    getMenu();
    getDraftMenu();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Dashboard: Add Menu ">
      <Container>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              centered
              value={value}
              onChange={handleChange}
              aria-label="Menu tabs"
              scrollButtons="auto"
            >
              {MenuTabs.map(({ label }, index) => (
                <Tab key={index} label={label} sx={{ ...commonTabstyle }} {...a11yProps(index)} />
              ))}
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            {/* <PublishedMenu /> */}
            hello
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ViewMenu />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AddCategory />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <AddItem />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <AddOption />
          </TabPanel>
        </Box>
      </Container>
    </Page>
  );
}

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Tab, Tabs, Box } from '@mui/material';
import Page from '../components/Page';
import AddItem from '../components/_dashboard/Addmenu/additem';
import AddCategory from '../components/_dashboard/Addmenu/addcartegory';
import AddOption from '../components/_dashboard/Addmenu/addoption';
import Fetch from '../components/_dashboard/Addmenu/Fetch';
import ViewMenu from '../components/_dashboard/Addmenu/viewmenu';

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
const MenuTabs = [
  {
    label: 'View Menu'
  },
  {
    label: 'Add Category'
  },
  {
    label: 'Add Item'
  },
  {
    label: 'Add Options'
  }
];
export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [categories, setcategories] = useState([]);
  useEffect(() => getCategory(), []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ************** GET CATEGORIES FUNCTION ***************** //

  const getCategory = async () => {
    Fetch({}, 'get_draft_menu')
      .then((res) => {
        setcategories(res.categories);
      })
      .catch((e) => {
        console.log(e);
        setcategories([]);
      });
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
              sx={{ '> Tab': { fontSize: 'h5.fontSize' } }}
              // variant="scrollable"
              scrollButtons="auto"
            >
              {MenuTabs.map(({ label }, index) => (
                <Tab key={index} label={label} sx={{ ...commonTabstyle }} {...a11yProps(index)} />
              ))}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ViewMenu categories={categories} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddCategory categories={categories} getCategory={getCategory} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AddItem categories={categories} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <AddOption />
          </TabPanel>
        </Box>
      </Container>
    </Page>
  );
}

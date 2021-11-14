/* eslint-disable camelcase */
import { useState } from 'react';
import { List, ListItem, ListItemText, Typography, IconButton, ListSubheader } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const ListContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.customShadows.z1,
  borderRadius: theme.shape.borderRadius,
  marginTop: '1.5rem',
  width: '100%'
}));

AvailableList.propTypes = {
  categories: PropTypes.array,
  // handleOpenmodal: PropTypes.func,
  deleteItemFromCategory: PropTypes.func
};

// ------------------------------------------------------
export default function AvailableList({ categories, deleteItemFromCategory, handleOpenmodal }) {
  const [selectedIndex, setSelectedIndex] = useState('');
  const handleClick = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex('');
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <ListContainer>
      <List
        dense={false}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" sx={{ borderRadius: 1 }}>
            <Typography
              sx={{
                mb: 2,
                pt: 2,
                color: 'grey[500]'
              }}
              variant="h6"
              component="div"
            >
              Available Items
            </Typography>
          </ListSubheader>
        }
      >
        {categories &&
          categories.map(({ category, category_id, items }, index) => {
            return items.map(({ option_groups }, index) => {
              return option_groups.map(({ group_name, group_id, options }, index) => {
                return (
                  <div key={index}>
                    <ListItemButton
                      onClick={() => {
                        handleClick(index);
                      }}
                      key={group_id}
                    >
                      <ListItemText primary={group_name} key={category_id} />
                      {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse key={index} in={index === selectedIndex} timeout="auto" unmountOnExit>
                      <List component="div" key={index}>
                        {options.map(({ option_name, option_id }) => {
                          return (
                            <ListItem
                              key={option_id}
                              sx={{ pl: 4 }}
                              secondaryAction={
                                <>
                                  <IconButton edge="end">
                                    <EditIcon aria-label="edit" />
                                  </IconButton>
                                  <IconButton
                                    edge="end"
                                    // onClick={() =>
                                    //   deleteItemFromCategory(category_id, item_id, item_name)
                                    // }
                                  >
                                    <DeleteIcon aria-label="delete" />
                                  </IconButton>
                                </>
                              }
                            >
                              <ListItemText primary={option_name} key={option_id} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  </div>
                );
              });
            });
          })}
      </List>
    </ListContainer>
  );
}

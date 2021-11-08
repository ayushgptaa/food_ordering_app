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
            return (
              <div key={index}>
                <ListItemButton
                  onClick={() => {
                    handleClick(index);
                  }}
                  key={category_id}
                >
                  <ListItemText primary={category} key={category_id} />
                  {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {items && (
                  <Collapse key={index} in={index === selectedIndex} timeout="auto" unmountOnExit>
                    <List component="div" key={index}>
                      {items.map(({ item_name, item_id }) => {
                        return (
                          <ListItem
                            key={item_id}
                            sx={{ pl: 4 }}
                            secondaryAction={
                              <>
                                <IconButton edge="end" onClick={() => handleOpenmodal(item_id)}>
                                  <EditIcon aria-label="edit" />
                                </IconButton>
                                <IconButton
                                  edge="end"
                                  onClick={() =>
                                    deleteItemFromCategory(category_id, item_id, item_name)
                                  }
                                >
                                  <DeleteIcon aria-label="delete" />
                                </IconButton>
                              </>
                            }
                          >
                            <ListItemText primary={item_name} key={item_id} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </div>
            );
          })}
      </List>
    </ListContainer>
  );
}

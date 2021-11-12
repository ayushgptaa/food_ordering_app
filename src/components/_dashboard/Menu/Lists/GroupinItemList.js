/* eslint-disable camelcase */
import { useState, useContext } from 'react';
import { List, ListItem, ListItemText, Typography, IconButton, ListSubheader } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { MenuContext } from '../MenuStore/Context-Provider';

const ListContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.customShadows.z1,
  borderRadius: theme.shape.borderRadius,
  marginTop: '1.5rem',
  width: '100%'
}));

GroupintemList.propTypes = {
  deleteOptiongroup: PropTypes.func
};

// ------------------------------------------------------
export default function GroupintemList({ deleteOptiongroup }) {
  const { categories } = useContext(MenuContext);
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
              Available Groups in Items
            </Typography>
          </ListSubheader>
        }
      >
        {categories &&
          categories.map(({ items }, index) => {
            return items.map(({ item_name, item_id, option_groups }) => {
              return (
                <div key={index}>
                  <ListItemButton
                    onClick={() => {
                      handleClick(index);
                    }}
                    key={item_id}
                  >
                    <ListItemText primary={item_name} key={item_id} />
                    {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {items && (
                    <Collapse key={index} in={index === selectedIndex} timeout="auto" unmountOnExit>
                      <List component="div" key={index}>
                        {option_groups.map(({ group_name, group_id }) => {
                          return (
                            <ListItem
                              key={group_id}
                              sx={{ pl: 4 }}
                              secondaryAction={
                                <IconButton
                                  edge="end"
                                  onClick={() => deleteOptiongroup(item_id, group_id, group_name)}
                                >
                                  <DeleteIcon aria-label="delete" />
                                </IconButton>
                              }
                            >
                              <ListItemText primary={group_name} key={group_id} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </div>
              );
            });
          })}
      </List>
    </ListContainer>
  );
}

/* eslint-disable camelcase */
import { useState } from 'react';
import { List, ListItem, ListItemText, Typography, IconButton, ListSubheader } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

const ListContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.customShadows.z1,
  borderRadius: theme.shape.borderRadius,
  marginTop: '1.5rem',
  width: '100%'
}));

// AvailableList.propTypes = {
//   categories: PropTypes.array,
//   // handleOpenmodal: PropTypes.func,
//   deleteItemFromCategory: PropTypes.func
// };

// ------------------------------------------------------
export default function GroupList({ categories }) {
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
              Available Option Groups
            </Typography>
          </ListSubheader>
        }
      >
        {categories &&
          categories.map(({ items }) => {
            return items.map(
              ({ option_groups }) =>
                option_groups &&
                option_groups.map(({ group_name, group_id }) => {
                  return (
                    <ListItem
                      key={group_id}
                      secondaryAction={
                        <>
                          <IconButton
                            edge="end"

                            // onClick={() => handleOpenmodal(category_id)}
                          >
                            <EditIcon aria-label="edit" />
                          </IconButton>
                          <IconButton
                            edge="end"
                            // onClick={() => deleteCategory(category, category_id)}
                          >
                            <DeleteIcon aria-label="delete" />
                          </IconButton>
                        </>
                      }
                    >
                      <ListItemText primary={group_name} key={group_id} />
                    </ListItem>
                  );
                })
            );
          })}
      </List>
    </ListContainer>
  );
}

/* eslint-disable camelcase */
import { List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

const ListContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.customShadows.z8,
  borderRadius: theme.shape.borderRadius,
  marginTop: '1.5rem',
  width: '100%'
}));

AvailableList.propTypes = {
  categories: PropTypes.array,
  handleOpenmodal: PropTypes.func,
  deleteCategory: PropTypes.func
};

// ------------------------------------------------------
export default function AvailableList({ categories, handleOpenmodal, deleteCategory }) {
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
              Available Categories
            </Typography>
          </ListSubheader>
        }
      >
        {categories &&
          categories.map(({ category, category_id }) => {
            return (
              <ListItem
                key={category_id}
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => handleOpenmodal(category_id)}>
                      <EditIcon aria-label="edit" />
                    </IconButton>
                    <IconButton edge="end" onClick={() => deleteCategory(category, category_id)}>
                      <DeleteIcon aria-label="delete" />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={category} key={category_id} />
              </ListItem>
            );
          })}
      </List>
    </ListContainer>
  );
}

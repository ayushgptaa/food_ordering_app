/* eslint-disable camelcase */
import { useState, useContext } from 'react';
import { List, ListItem, ListItemText, Typography, IconButton, ListSubheader } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import PropType from 'prop-types';
import { MenuContext } from '../MenuStore/Context-Provider';

const ListContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.customShadows.z1,
  borderRadius: theme.shape.borderRadius,
  marginTop: '1.5rem',
  width: '100%'
}));

GroupList.propTypes = {
  deleteOptionGroup: PropType.func
};

// ------------------------------------------------------
export default function GroupList({ deleteOptionGroup }) {
  const { optiongroups, handleOpenmodal } = useContext(MenuContext);

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
        {optiongroups &&
          optiongroups.map(({ group_name, group_id }) => {
            return (
              <ListItem
                key={group_id}
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => handleOpenmodal(group_id)}>
                      <EditIcon aria-label="edit" />
                    </IconButton>
                    <IconButton edge="end" onClick={() => deleteOptionGroup(group_name, group_id)}>
                      <DeleteIcon aria-label="delete" />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={group_name} key={group_id} />
              </ListItem>
            );
          })}
      </List>
    </ListContainer>
  );
}

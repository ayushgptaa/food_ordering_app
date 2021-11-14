/* eslint-disable camelcase */
import { useState, useContext, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  ListSubheader,
  ListItemButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
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
  deleteOptionGroup: PropType.func,
  deleteOption: PropType.func
};

// ------------------------------------------------------

export default function GroupList({ deleteOptionGroup, deleteOption }) {
  const { optiongroups, optionsarr, handleOpenmodal } = useContext(MenuContext);
  const [combinedOpgroup, setcombinedOpgroup] = useState([]);
  useEffect(() => {
    combinedOptionGroupfn();
  }, [optiongroups]);

  const [selectedIndex, setSelectedIndex] = useState('');
  const handleClick = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex('');
    } else {
      setSelectedIndex(index);
    }
  };
  // ************** CREATE COMBINED OPTION GROUP FUNCTION ***************** //
  const combinedOptionGroupfn = () => {
    const arr = optiongroups.map((optiongroup) => {
      return {
        ...optiongroup,
        options: optionsarr.filter((option) => option.group_id === optiongroup.group_id && option)
      };
    });
    setcombinedOpgroup(arr);
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
        {combinedOpgroup &&
          combinedOpgroup.map(({ group_name, group_id, options }, index) => {
            return (
              <div key={index}>
                <ListItem key={group_id}>
                  <IconButton edge="end" onClick={() => handleOpenmodal(group_id)}>
                    <EditIcon aria-label="edit" />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => deleteOptionGroup(group_name, group_id)}
                    sx={{ pl: 2 }}
                  >
                    <DeleteIcon aria-label="delete" />
                  </IconButton>

                  <ListItemText primary={group_name} key={group_id} sx={{ pl: 5 }} />
                  {index === selectedIndex ? (
                    <IconButton
                      onClick={() => {
                        handleClick(index);
                      }}
                    >
                      <ExpandLess />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        handleClick(index);
                      }}
                    >
                      <ExpandMore />
                    </IconButton>
                  )}
                </ListItem>
                {options && (
                  <Collapse key={index} in={index === selectedIndex} timeout="auto" unmountOnExit>
                    <List component="div" key={index}>
                      {options.map(({ option_name, option_id }) => {
                        return (
                          <ListItem
                            key={option_id}
                            sx={{ pl: 4 }}
                            secondaryAction={
                              <>
                                <IconButton edge="end" onClick={() => handleOpenmodal(option_id)}>
                                  <EditIcon aria-label="edit" />
                                </IconButton>
                                <IconButton
                                  edge="end"
                                  onClick={() => deleteOption(option_id, group_id, option_name)}
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
                )}
              </div>
            );
          })}
      </List>
    </ListContainer>
  );
}

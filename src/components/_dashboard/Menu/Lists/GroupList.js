/* eslint-disable camelcase */
import { useState, useContext, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, IconButton, ListSubheader } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
  deleteOption: PropType.func,
  handleOptionmodal: PropType.func
};

const SelectUptoFeild = ({ options, groupId, select_upto }) => {
  useEffect(() => {
    if (select_upto) {
      setSelectUpto(select_upto);
    } else {
      setSelectUpto('');
    }
  }, []);
  const { editfn } = useContext(MenuContext);
  const [selectUpto, setSelectUpto] = useState('');

  const selectuptohandler = (e) => {
    setSelectUpto(e.target.value);
    const data = {
      group_id: groupId,
      select_upto: e.target.value
    };
    // ************** EDIT OPTION GROUP FUNCTION ***************** //
    const SuccessMsg = `Changed select Upto to ${data.select_upto} :)`;
    const ErrorMsg = ` Unable to add select upto. Try again :)`;
    editfn('edit_option_group', data, SuccessMsg, ErrorMsg);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 100, p: 0 }}>
      <InputLabel id="simple-select-label">Select</InputLabel>
      <Select
        label="Select"
        labelId="simple-select-label"
        id="demo-simple-select-autowidth"
        value={selectUpto}
        onChange={selectuptohandler}
      >
        {options.map((options, index) => {
          return (
            <MenuItem value={index + 1} key={index + 1}>
              {index + 1}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

SelectUptoFeild.propTypes = {
  options: PropType.array,
  groupId: PropType.string,
  select_upto: PropType.number
};

// ------------------------------------------------------

export default function GroupList({ deleteOptionGroup, deleteOption, handleOptionmodal }) {
  const { optiongroups, optionsarr, handleOpenmodal } = useContext(MenuContext);
  const [combinedOpgroup, setcombinedOpgroup] = useState([]);

  useEffect(() => {
    combinedOptionGroupfn();
  }, [optiongroups]);

  const [selectedIndex, setSelectedIndex] = useState({});
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
          combinedOpgroup.map(({ group_name, group_id, select_upto, options }, index) => {
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
                  <ListItemText primary={group_name} key={group_id} sx={{ pl: 2 }} />
                  <SelectUptoFeild options={options} groupId={group_id} select_upto={select_upto} />
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
                                <IconButton edge="end" onClick={() => handleOptionmodal(option_id)}>
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

/* eslint-disable react/jsx-no-bind */
/* eslint-disable camelcase */
import { useContext, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SnackBar from 'src/components/Snackbar';
import LoadingButton from 'src/components/LoadingButton';
import TabsContainer from '../../../TabsContainer';
import { MenuContext } from '../../../MenuStore/Context-Provider';
import GroupIintemList from '../../../Lists/GroupinItemList';

export default function AddOptionGroup() {
  const defaultStates = {
    item_id: '',
    group_id: ''
  };
  const { categories, optiongroups, btnloading, snackbar, closeSnackbar, addfn, deletefn } =
    useContext(MenuContext);
  const [disabled, setDisabled] = useState(true);
  const [itemname, setItemname] = useState('');
  const [groupname, setGroupname] = useState('');
  const [input, setInput] = useState(defaultStates);
  const itemHandler = (item_name, item_id) => {
    setDisabled(false);
    setInput({
      ...input,
      item_id
    });

    setItemname(item_name);
  };
  const groupHandler = (group_id, group_name) => {
    setInput({
      ...input,
      group_id
    });

    setGroupname(group_name);
  };

  // ************** ADD OPTON GROUP TO ITEM FUNCTION ***************** //

  const addOptionGrouptoItem = async () => {
    const data = {
      connection: {
        ...input
      }
    };

    setInput(defaultStates);
    setItemname('');
    setGroupname('');
    const SuccessMsg = `Option Group added to the Items :)`;
    const ErrorMsg = `Unable to add Option Group to Item. Try again :(`;
    addfn('add_option_group_to_item', data, SuccessMsg, ErrorMsg);
  };

  // ************** DELETE OPTION GROUP FUNCTION ***************** //

  const deleteOptiongroup = async (item_id, group_id, group_name) => {
    const data = {
      item_id,
      group_id
    };

    const SuccessMsg = ` Deleted ${group_name} from the Items :)`;
    const ErrorMsg = ` Unable to delete ${group_name} from the Items. Try again :)`;
    deletefn('remove_option_group_from_item', data, SuccessMsg, ErrorMsg);
  };
  return (
    <TabsContainer Heading="Add Option Group to Items">
      <FormControl fullWidth sx={{ mt: 1.5 }}>
        <InputLabel id="demo-simple-select-label">Select Item </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={itemname}
          name="item_id"
          label="Select Item"
        >
          {categories.map(({ items }) => {
            return items.map(({ item_name, item_id }) => {
              return (
                <MenuItem
                  value={item_name}
                  key={item_id}
                  onClick={() => itemHandler(item_name, item_id)}
                >
                  {item_name}
                </MenuItem>
              );
            });
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mt: 1.5 }}>
        <InputLabel id="demo-simple-select-label">Select Option Group </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={groupname}
          name="item_id"
          label="Select Option Group"
        >
          {optiongroups.map(({ group_name, group_id }) => {
            return (
              <MenuItem
                value={group_name}
                key={group_id}
                onClick={() => groupHandler(group_id, group_name)}
              >
                {group_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <LoadingButton
        disabled={disabled}
        addCategory={addOptionGrouptoItem}
        btnloading={btnloading}
        loadingIndicator="Adding..."
      >
        ADD
      </LoadingButton>
      <GroupIintemList categories={categories} deleteOptiongroup={deleteOptiongroup} />
      <SnackBar
        open={snackbar.open}
        severity={snackbar.severity}
        handleClose={closeSnackbar}
        message={snackbar.message}
      />
    </TabsContainer>
  );
}

/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Select,
  Grid,
  Box,
  InputLabel,
  FormControl,
  InputAdornment,
  MenuItem
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LoadingButton from 'src/components/LoadingButton';
import CustomTextFeild from 'src/components/TextField';
import TabsContainer from '../../../TabsContainer';
import GroupList from '../../../Lists/GroupList';
import { MenuContext } from '../../../MenuStore/Context-Provider';
import OptionsModal from '../../../Modals/OptionsModal';

// ------------------------------------------------

export default function Options({ deleteOptionGroup, editOptionGroup }) {
  const { optiongroups, btnloading, addfn, deletefn } = useContext(MenuContext);
  const defaultStates = {
    option_name: '',
    option_price: ''
  };
  const [disabled, setDisabled] = useState(true);
  const [input, setInput] = useState(defaultStates);
  const [optionmodal, setoptionmodal] = useState(false);
  const [selectupto, setSelectupto] = useState('');
  const [optionid, setOptionid] = useState('');
  const [groupinfo, setGroupinfo] = useState({ group_id: '', group_name: '' });

  // ************** ADD OPTION TO OPTION GROUP FUNCTION ***************** /
  const addOptions = () => {
    const data = {
      group_id: groupinfo.group_id,
      option: {
        ...input
      }
    };

    setInput(defaultStates);
    const SuccessMsg = `${input.option_name} added to Option Group :)`;
    const ErrorMsg = `Unable to add  ${input.option_name} to Option. Try again :(`;
    addfn('add_option', data, SuccessMsg, ErrorMsg);
  };

  // ************** DELETE OPTION FUNCTION ***************** /
  const deleteOption = (option_id, group_id, option_name) => {
    const data = {
      option_id
    };
    const SuccessMsg = `${option_name} deleted from Option Group :)`;
    const ErrorMsg = `Unable to delete  ${option_name}. Try again :(`;
    deletefn('remove_option', data, SuccessMsg, ErrorMsg);
  };

  // ************** EDIT OPTION FUNCTION ***************** /
  const editOption = ({ option_price, option_name }, option_id) => {
    const data = {
      option_id,
      option_name,
      option_price
    };

    const SuccessMsg = `Changed Option to ${option_name}  :)`;
    const ErrorMsg = `Unable to change  ${option_name}. Try again :(`;
    deletefn('edit_option', data, SuccessMsg, ErrorMsg);
  };

  const handleOptionmodal = (id) => {
    setoptionmodal(true);
    setOptionid(id);
  };

  const closeOptionmodal = () => {
    setoptionmodal(false);
  };

  const groupHandler = (group_id, group_name) => {
    setGroupinfo({
      group_id,
      group_name
    });
  };

  const selecthandler = (e) => {
    setSelectupto(e.target.value);
    setDisabled(false);
  };

  const inputhandler = (e) => {
    const { value } = e.target;
    setInput({
      ...input,
      [e.target.name]: value
    });
    setDisabled(false);
  };
  return (
    <TabsContainer Heading="Add Options" margintop="true">
      <FormControl fullWidth sx={{ mt: 1.5 }}>
        <InputLabel id="demo-simple-select-label">Select Option Group </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={groupinfo.group_name}
          name="group_id"
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
      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={1}
        direction="row"
      >
        <Grid item xs={6}>
          <CustomTextFeild
            label="Option name"
            placeholder="Enter Option name "
            name="option_name"
            fullWidth={false}
            onChange={inputhandler}
            value={input.option_name}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomTextFeild
            label="Amount"
            placeholder="Enter Amount"
            InputProps={{
              endAdornment: <InputAdornment position="end">$</InputAdornment>
            }}
            onChange={inputhandler}
            name="option_price"
            type="number"
            value={input.option_price}
          />
        </Grid>
        <Grid item sm={2}>
          <LoadingButton
            disabled={disabled}
            addCategory={addOptions}
            btnloading={btnloading}
            loadingIndicator="Adding..."
            sx={{ padding: '16.5px' }}
          >
            <AddCircleOutlineIcon />
          </LoadingButton>
        </Grid>
      </Grid>

      <CustomTextFeild
        label="Select Upto"
        placeholder="Select Upto"
        type="number"
        name="select_upto"
        onChange={selecthandler}
        value={selectupto}
      />

      <LoadingButton disabled={disabled} onClick={addOptions}>
        ADD
      </LoadingButton>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <GroupList
          deleteOptionGroup={deleteOptionGroup}
          deleteOption={deleteOption}
          handleOptionmodal={handleOptionmodal}
        />
      </Box>

      <OptionsModal
        open={optionmodal}
        handleClose={closeOptionmodal}
        optionid={optionid}
        editOption={editOption}
      />
    </TabsContainer>
  );
}

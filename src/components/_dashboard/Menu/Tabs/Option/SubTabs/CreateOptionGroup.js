/* eslint-disable camelcase */
import { useState, useContext } from 'react';
import { Select, Box, MenuItem, InputLabel, FormControl } from '@mui/material';
import LoadingButton from 'src/components/LoadingButton';
import CustomTextFeild from 'src/components/TextField';
import SnackBar from 'src/components/Snackbar';
import GroupList from '../../../Lists/GroupList';
import TabsContainer from '../../../TabsContainer';
import { MenuContext } from '../../../MenuStore/Context-Provider';
import Modal from '../../../Modals/OptionGroupModal';
// ----------------------------------------------------------

export default function AddOptionGroup() {
  const {
    btnloading,
    snackbar,
    openmodal,
    modalid,
    handleClosemodal,
    closeSnackbar,
    addfn,
    deletefn,
    editfn
  } = useContext(MenuContext);

  const defaultStates = {
    group_name: '',
    required_or_optional: '',
    select_upto: ''
  };

  const [disabled, setDisabled] = useState(true);
  const [input, setInput] = useState(defaultStates);

  // ************** ADD OPTION GROUP FUNCTION ***************** /
  const getOptionGroup = () => {
    const data = {
      option_group: {
        ...input,
        select_upto: Number(input.select_upto)
      }
    };
    // openOptions();
    const SuccessMsg = `${input.group_name} added to  :)`;
    const ErrorMsg = `Unable to add  ${input.group_name} to Categories. Try again :(`;
    addfn('add_option_group', data, SuccessMsg, ErrorMsg);
  };

  // ************** DELETE OPTION GROUP FUNCTION ***************** //

  const deleteOptionGroup = async (groupname, group_id) => {
    const data = {
      group_id
    };
    const SuccessMsg = ` Deleted ${groupname} from the Group Options :)`;
    const ErrorMsg = ` Unable to delete ${groupname} from the Option Groups. Try again :)`;
    deletefn('remove_option_group_completely', data, SuccessMsg, ErrorMsg);
  };

  // ************** EDIT OPTION GROUP FUNCTION ***************** //

  const editOptionGroup = async ({ group_name, required_or_optional, select_upto }, group_id) => {
    const data = {
      group_name,
      required_or_optional,
      select_upto: Number(select_upto),
      group_id
    };
    const SuccessMsg = `Changed Category to ${group_name} :)`;
    const ErrorMsg = ` Unable to change Option Group. Try again :)`;
    editfn('edit_option_group', data, SuccessMsg, ErrorMsg);
  };
  const inputhandler = (e) => {
    const { value } = e.target;

    setDisabled(false);
    setInput({
      ...input,
      [e.target.name]: value
    });
  };

  return (
    <TabsContainer Heading="Create Option Group">
      <CustomTextFeild
        label="Option group name"
        placeholder="Enter Option group"
        onChange={inputhandler}
        name="group_name"
        value={input.group_name}
      />
      <FormControl fullWidth sx={{ mt: 1.5 }}>
        <InputLabel id="simple-select-label">Required or Optional</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          name="required_or_optional"
          label="Required or Optional"
          onChange={inputhandler}
          value={input.required_or_optional}
        >
          <MenuItem value="required">Required</MenuItem>
          <MenuItem value="optional">Optional</MenuItem>
        </Select>
      </FormControl>
      <CustomTextFeild
        label="Select Upto"
        placeholder="Select Upto"
        type="number"
        name="select_upto"
        onChange={inputhandler}
        value={input.select_upto}
      />
      <LoadingButton
        disabled={disabled}
        addCategory={getOptionGroup}
        btnloading={btnloading}
        loadingIndicator="Adding..."
      >
        ADD
      </LoadingButton>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <GroupList deleteOptionGroup={deleteOptionGroup} editOptionGroup={editOptionGroup} />
      </Box>
      <SnackBar
        open={snackbar.open}
        severity={snackbar.severity}
        handleClose={closeSnackbar}
        message={snackbar.message}
      />
      <Modal
        open={openmodal}
        handleClose={handleClosemodal}
        groupid={modalid}
        editOptionGroup={editOptionGroup}
      />
    </TabsContainer>
  );
}

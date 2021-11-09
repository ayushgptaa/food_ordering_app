/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useState } from 'react';
import { Select, Box, MenuItem, InputLabel, FormControl } from '@mui/material';
import LoadingButton from 'src/components/LoadingButton';

import CustomTextFeild from 'src/components/TextField';
// import TabsHeading from '../../TabsHeading';
import SnackBar from 'src/components/Snackbar';
import GroupList from '../../../GroupList';
import TabsContainer from '../../../TabsContainer';
import Fetch from '../../../Fetch';

export default function AddOption({ categories, getCategory }) {
  const defaultStates = {
    group_name: '',
    required_or_optional: '',
    select_upto: ''
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ open: false });
  };
  const [disabled, setDisabled] = useState(true);
  const [input, setInput] = useState(defaultStates);
  const [btnloading, setBtnloading] = useState(false);
  const [snackbar, setSnackbar] = useState({ severity: 'success', open: false, message: '' });
  // const [openmodal, setOpenmodal] = useState(false);
  // const [id, setid] = useState('');

  // ************** ADD CATEGORY FUNCTION ***************** /
  const getOptionGroups = () => {
    // setBtnloading(true);
    const data = {
      option_group: {
        ...input,
        select_upto: Number(input.select_upto)
      }
    };
    console.log(data);

    Fetch(data, 'add_option')
      .then(() => {
        getCategory();
        setBtnloading(false);
        setInput(defaultStates);
        setSnackbar({
          severity: 'success',
          open: true,
          message: `${input.group_name} added to  :)`
        });
      })
      .catch((e) => {
        console.log(e);
        setInput(defaultStates);
        setBtnloading(false);
        setSnackbar({
          severity: 'error',
          open: true,
          message: `Unable to add  ${input.group_name} to Categories. Try again :(`
        });
      });
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
        placeholder="Enter Option group   "
        onChange={inputhandler}
        name="group_name"
        value={input.group_name}
      />

      <FormControl fullWidth sx={{ mt: 1.5 }}>
        <InputLabel id="simple-select-label">Required or Optional</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          // value={input.required_or_optional}
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
        // value={input.select_upto}
      />
      <LoadingButton
        disabled={disabled}
        addCategory={getOptionGroups}
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
        <GroupList categories={categories} />
      </Box>
      <SnackBar
        open={snackbar.open}
        severity={snackbar.severity}
        handleClose={handleClose}
        message={snackbar.message}
      />
    </TabsContainer>
  );
}

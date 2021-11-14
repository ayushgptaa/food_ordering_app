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
import { MenuContext } from '../../../MenuStore/Context-Provider';
import GroupList from '../../../Lists/GroupList';

// ------------------------------------------------
// let AddedOptions = [];
// function getStyles(name, options, theme) {
//   return {
//     fontWeight:
//       options.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium
//   };
// }
export default function Options({ deleteOptionGroup, editOptionGroup }) {
  // const theme = useTheme();
  const { optiongroups, btnloading, addfn } = useContext(MenuContext);
  const defaultStates = {
    option_name: '',
    option_price: ''
  };
  const [disabled, setDisabled] = useState(true);
  const [input, setInput] = useState(defaultStates);
  // const [options, setOptions] = useState([]);
  const [selectupto, setSelectupto] = useState('');
  const [groupinfo, setGroupinfo] = useState({ group_id: '', group_name: '' });

  // ************** ADD OPTIONs TO OPTION GROUP FUNCTION ***************** /
  const addOptions = () => {
    // const obj = {};
    // const select_upto = AddedOptions.length;
    // AddedOptions.forEach((element, index) => {
    //   obj[index] = element;
    // });
    // setOptions([]);
    // AddedOptions = [];
    // console.log(groupinfo.group_id);
    const data = {
      group_id: groupinfo.group_id,
      option: {
        ...input
      }
    };
    console.log(data);
    setInput(defaultStates);

    // const SuccessMsg = `${input.group_name} added to Option Group :)`;
    // const ErrorMsg = `Unable to add  ${input.group_name} to Categories. Try again :(`;
    // addfn('add_option', data, SuccessMsg, ErrorMsg);
  };
  const groupHandler = (group_id, group_name) => {
    setGroupinfo({
      group_id,
      group_name
    });
  };
  // const handleChange = (event) => {
  //   const {
  //     target: { value }
  //   } = event;
  //   setOptions(typeof value === 'string' ? value.split(',') : value);
  // };
  const selectHandler = (e) => {
    setSelectupto(e.target.value);
  };
  const plusbtnhandler = () => {
    // const obj = { ...input };
    // AddedOptions.push(obj);
    setInput(defaultStates);
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
        onChange={selectHandler}
        value={selectupto}
      />
      {/* <FormControl fullWidth sx={{ mt: 1.5 }}>
        <InputLabel id="demo-multiple-name-label">Select Upto</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={options}
          label="Select Upto"
          onChange={handleChange}
          // input={<OutlinedInput label="Name" />}
          // MenuProps={MenuProps}
        >
          {AddedOptions.map(({ option_name }, index) => (
            <MenuItem
              key={index}
              value={option_name}
              style={getStyles(option_name, options, theme)}
            >
              {option_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

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
        <GroupList deleteOptionGroup={deleteOptionGroup} editOptionGroup={editOptionGroup} />
      </Box>
    </TabsContainer>
  );
}

/* eslint-disable camelcase */
import { useState } from 'react';
import {
  Select,
  Grid,
  Box,
  InputLabel,
  FormControl,
  InputAdornment,
  MenuItem
} from '@mui/material';
import LoadingButton from 'src/components/LoadingButton';
import CustomTextFeild from 'src/components/TextField';
import TabsHeading from '../../TabsHeading';

// ------------------------------------------------

export default function Options({ categories }) {
  const defaultStates = {
    group_id: '',
    option_name: '',
    option_price: null
  };
  const [disabled, setDisabled] = useState(true);
  const [btnloading, setBtnloading] = useState(false);
  const [input, setInput] = useState(defaultStates);
  const btnhandler = () => {
    console.log(input);
  };
  const inputhandler = (e) => {
    const { value } = e.target;
    setDisabled(false);
    console.log({ ...input });
    setInput({
      ...input,
      [e.target.name]: value
    });
  };
  return (
    <Grid container direction="column" alignItems="center">
      <TabsHeading Heading="Add Options to Option Group" />
      <Box
        sx={{
          maxWidth: 350,
          mt: 1.5
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Option Group </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={input.group_id}
            name="group_id"
            label="Select Option Group"
            onChange={inputhandler}
          >
            {categories &&
              categories.map(({ items }) => {
                return items.map(({ option_groups }) => {
                  return option_groups.map(({ group_name, group_id }) => {
                    return (
                      <MenuItem value={group_id} key={group_id}>
                        {group_name}
                      </MenuItem>
                    );
                  });
                });
              })}
          </Select>
        </FormControl>

        <CustomTextFeild
          label="Option name"
          placeholder="Enter Option name "
          name="option_name"
          onChange={inputhandler}
        />

        <CustomTextFeild
          margin="dense"
          label="Amount"
          placeholder="Enter Amount"
          InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>
          }}
          onChange={inputhandler}
          name="option_price"
          type="number"
        />
        <LoadingButton
          disabled={disabled}
          addCategory={btnhandler}
          btnloading={btnloading}
          loadingIndicator="Adding..."
        >
          ADD
        </LoadingButton>
      </Box>
    </Grid>
  );
}

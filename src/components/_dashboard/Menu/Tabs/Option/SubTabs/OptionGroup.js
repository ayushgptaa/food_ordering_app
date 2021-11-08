/* eslint-disable camelcase */
import { useState } from 'react';
import { Select, Grid, Box, MenuItem, InputLabel, FormControl } from '@mui/material';
import LoadingButton from 'src/components/LoadingButton';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import CustomTextFeild from 'src/components/TextField';
import TabsHeading from '../../TabsHeading';

export default function AddOption({ categories }) {
  const [disabled, setDisabled] = useState(true);
  const [btnloading, setBtnloading] = useState(false);
  return (
    <Grid container direction="column" alignItems="center">
      <TabsHeading Heading="Add Option Group to Item" />
      <Box
        sx={{
          maxWidth: 350,
          mt: 2
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Item </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={input.category_id}
            value=""
            name="item_id"
            label="Select Item"
            // onChange={inputhandler}
          >
            {categories.map(({ items }) => {
              return items.map(({ item_name, item_id }) => {
                return (
                  <MenuItem value={item_id} key={item_id}>
                    {item_name}
                  </MenuItem>
                );
              });
            })}
          </Select>
        </FormControl>

        <CustomTextFeild label="Option group name" placeholder="Enter Option group " />
        <CustomTextFeild label="Select Upto" placeholder="Select Upto" type="number" />

        <FormControl fullWidth sx={{ mt: 1.5 }}>
          <InputLabel id="simple-select-label">Required or Optional</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value=""
            name="required_or_optional"
            label="Required or Optional"
            // onChange={inputhandler}
          >
            <MenuItem value="required">Required</MenuItem>
            <MenuItem value="optional">Optional</MenuItem>
          </Select>
        </FormControl>
        <LoadingButton
          disabled={disabled}
          // addCategory={addItemtoCategory}
          btnloading={btnloading}
          loadingIndicator="Adding..."
        >
          ADD
        </LoadingButton>
      </Box>
    </Grid>
  );
}
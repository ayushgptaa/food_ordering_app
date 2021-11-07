import { Select, Grid, Box, InputLabel, FormControl, InputAdornment } from '@mui/material';
import LoadingButton from 'src/components/LoadingButton';
import CustomTextFeild from 'src/components/TextField';
import TabsHeading from '../../TabsHeading';

// ------------------------------------------------

export default function Options({ categories }) {
  return (
    <Grid container direction="column" alignItems="center">
      <TabsHeading Heading="Add Options to Option Group" />
      <Box
        sx={{
          maxWidth: 350,
          mt: 2
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Option Group </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={input.category_id}
            value=""
            name="item_id"
            label="Select Option Group"
            // onChange={inputhandler}
          >
            {/* {categories.map(({ items }) => {
            return items.map(({ item_name, item_id }) => {
              return (
                <MenuItem value={item_id} key={item_id}>
                  {item_name}
                </MenuItem>
              );
            });
          })} */}
          </Select>
        </FormControl>

        <CustomTextFeild label="Option name" placeholder="Enter Option name " />

        <CustomTextFeild
          margin="dense"
          label="Amount"
          placeholder="Enter Amount"
          InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>
          }}
          // onChange={inputhandler}
          name="item_price"
          type="number"
        />
        <LoadingButton
          // disabled={disabled}
          // addCategory={addItemtoCategory}
          // btnloading={btnloading}
          loadingIndicator="Adding..."
        >
          ADD
        </LoadingButton>
      </Box>
    </Grid>
  );
}

/* eslint-disable camelcase */
import { useState } from 'react';
import {
  Select,
  Grid,
  Button,
  Box,
  InputAdornment,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import PropTypes from 'prop-types';
import CustomTextFeild from '../../TextField';

AddItem.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      category_id: PropTypes.string
    })
  )
};
// eslint-disable-next-line react/prop-types
export default function AddItem({ categories }) {
  const defaultStates = {
    item_name: '',
    item_description: '',
    item_amount: '',
    category_id: ''
  };
  const [input, setInput] = useState(defaultStates);

  const inputhandler = (e) => {
    const { value } = e.target;
    setInput({
      ...input,
      [e.target.name]: value
    });
  };
  return (
    <Grid container direction="column" alignItems="center">
      <Box
        sx={{
          maxWidth: 400
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={input.category_id}
            name="category_id"
            label="Category"
            onChange={inputhandler}
          >
            {categories.map(({ category, category_id }) => {
              return (
                <MenuItem value={category_id} key={category_id}>
                  {category}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <CustomTextFeild
          label="Item Title"
          placeholder="Enter Item"
          onChange={inputhandler}
          name="item_name"
        />
        <CustomTextFeild
          label="Item Description"
          placeholder="Item Description"
          multiline
          rows={4}
          onChange={inputhandler}
          name="item_description"
        />
        <CustomTextFeild
          margin="dense"
          label="Amount"
          placeholder="Enter Amount"
          InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>
          }}
          onChange={inputhandler}
          name="item_amount"
        />
        <Button
          variant="contained"
          sx={{ py: 1.5, mt: 2, fontSize: 'subtitle1.fontSize', width: '100%' }}
          onClick={() => console.log(input)}
        >
          ADD
        </Button>
      </Box>
    </Grid>
  );
}

/* eslint-disable camelcase */
import { useState } from 'react';
import {
  Select,
  Grid,
  Box,
  InputAdornment,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import PropTypes from 'prop-types';
import CustomTextFeild from '../../TextField';
import Fetch from './Fetch';
import LoadingButton from '../../LoadingButton';
import SnackBar from '../../Snackbar';

AddItem.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      category_id: PropTypes.string
    })
  )
};
// eslint-disable-next-line react/prop-types
export default function AddItem({ categories, getCategory }) {
  const defaultStates = {
    item_name: '',
    item_description: '',
    item_price: null,
    category_id: ''
  };
  const [input, setInput] = useState(defaultStates);
  const [disabled, setDisabled] = useState(true);
  const [btnloading, setBtnloading] = useState(false);
  const [snackbar, setSnackbar] = useState({ severity: 'success', open: false, message: '' });

  const inputhandler = (e) => {
    const { value } = e.target;
    setDisabled(false);
    setInput({
      ...input,
      [e.target.name]: value,
      item_price: Number(value)
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ open: false });
  };
  // ************** ADD ITEM TO CATEGORY FUNCTION ***************** //

  const addItemtoCategory = async () => {
    setBtnloading(true);
    const data = {
      ...input
    };
    Fetch(data, 'add_item')
      .then(() => {
        getCategory();
        setBtnloading(false);
        setSnackbar({
          severity: 'success',
          open: true,
          message: `${input.item_name} added to the Categories :)`
        });
        setInput(defaultStates);
      })
      .catch(() => {
        setBtnloading(false);
        setSnackbar({
          severity: 'error',
          open: true,
          message: `Unable to add  ${input.item_name} to Categories. Try again :(`
        });
      });
  };
  return (
    <>
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
            name="item_price"
            type="number"
          />
          <LoadingButton
            disabled={disabled}
            addCategory={addItemtoCategory}
            btnloading={btnloading}
            loadingIndicator="Adding..."
          >
            ADD
          </LoadingButton>
        </Box>
      </Grid>
      <SnackBar
        open={snackbar.open}
        severity={snackbar.severity}
        handleClose={handleClose}
        message={snackbar.message}
      />
    </>
  );
}

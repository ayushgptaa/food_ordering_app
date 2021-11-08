/* eslint-disable camelcase */
import { useState } from 'react';
import { Select, Box, InputAdornment, MenuItem, InputLabel, FormControl } from '@mui/material';
import PropTypes from 'prop-types';
import CustomTextFeild from 'src/components/TextField';
import LoadingButton from 'src/components/LoadingButton';
import SnackBar from 'src/components/Snackbar';
import Fetch from '../Fetch';
import ItemList from '../ItemList';
import Modal from '../ItemModal';
import TabsContainer from '../TabsContainer';

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
  const [openmodal, setOpenmodal] = useState(false);
  const [id, setid] = useState('');

  const handleOpenmodal = (id) => {
    setOpenmodal(true);
    setid(id);
  };

  const handleClosemodal = () => {
    setOpenmodal(false);
  };

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
        setInput(defaultStates);
        setSnackbar({
          severity: 'success',
          open: true,
          message: `${input.item_name} added to the Categories :)`
        });
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

  // ************** DELETE ITEM FROM CATEGORY FUNCTION ***************** //

  const deleteItemFromCategory = async (category_id, item_id, item) => {
    const data = {
      category_id,
      item_id
    };

    Fetch(data, 'remove_item_from_category')
      .then(() => {
        getCategory();
        setSnackbar({
          severity: 'warning',
          open: true,
          message: ` Deleted ${item} from the Categories :)`
        });
      })
      .catch(() => {
        setSnackbar({
          severity: 'error',
          open: true,
          message: `Unable to delete ${item} from the Categories. Try again :(`
        });
      });
  };

  // ************** EDIT ITEM FROM CATEGORY FUNCTION ***************** //

  const editItem = async ({ item_name, item_description, item_price }, item_id) => {
    const data = {
      item_id: id,
      item_name,
      item_description,
      item_price
    };
    Fetch(data, 'edit_item')
      .then(() => {
        getCategory();
        handleClosemodal();
        setSnackbar({
          severity: 'success',
          open: true,
          message: `Changed Category to ${input} :)`
        });
      })
      .catch(() => {
        setSnackbar({
          severity: 'error',
          open: true,
          message: `Unable to change category. Try again :(`
        });
      });
  };
  return (
    <TabsContainer Heading="Add Item to Catrgory">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={input.category_id}
          name="category_id"
          label="Select Category"
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

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <ItemList
          categories={categories}
          deleteItemFromCategory={deleteItemFromCategory}
          handleOpenmodal={handleOpenmodal}
        />
      </Box>
      <SnackBar
        open={snackbar.open}
        severity={snackbar.severity}
        handleClose={handleClose}
        message={snackbar.message}
      />
      <Modal open={openmodal} handleClose={handleClosemodal} editCategory={editItem} itemid={id} />
    </TabsContainer>
  );
}

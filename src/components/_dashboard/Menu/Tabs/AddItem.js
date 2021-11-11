/* eslint-disable camelcase */
import { useState, useContext } from 'react';
import { Select, Box, InputAdornment, MenuItem, InputLabel, FormControl } from '@mui/material';
import CustomTextFeild from 'src/components/TextField';
import LoadingButton from 'src/components/LoadingButton';
import SnackBar from 'src/components/Snackbar';
import ItemList from '../ItemList';
import Modal from '../ItemModal';
import TabsContainer from '../TabsContainer';
import { MenuContext } from '../MenuStore/Context-Provider';

// eslint-disable-next-line react/prop-types
export default function AddItem() {
  const {
    categories,
    snackbar,
    openmodal,
    modalid,
    btnloading,
    handleOpenmodal,
    handleClosemodal,
    closeSnackbar,
    addfn,
    deletefn,
    editfn
  } = useContext(MenuContext);
  const defaultStates = {
    item_name: '',
    item_description: '',
    item_price: null,
    category_id: ''
  };
  const [input, setInput] = useState(defaultStates);
  const [disabled, setDisabled] = useState(true);

  const inputhandler = (e) => {
    const { value } = e.target;
    setDisabled(false);
    setInput({
      ...input,
      [e.target.name]: value,
      item_price: Number(value)
    });
  };

  // ************** ADD ITEM TO CATEGORY FUNCTION ***************** //

  const addItemtoCategory = async () => {
    const data = {
      ...input
    };
    const SuccessMsg = `${input.item_name} added to the Categories :)`;
    const ErrorMsg = `Unable to add  ${input.item_name} to Categories. Try again :(`;
    addfn('add_item', data, SuccessMsg, ErrorMsg);
  };

  // // ************** DELETE ITEM FROM CATEGORY FUNCTION ***************** //

  const deleteItemFromCategory = async (category_id, item_id, item) => {
    const data = {
      category_id,
      item_id
    };
    const SuccessMsg = ` Deleted ${item} from the Categories :)`;
    const ErrorMsg = ` Unable to delete ${item} from the Categories. Try again :)`;
    deletefn('remove_item_from_category', data, SuccessMsg, ErrorMsg);
  };

  // // ************** EDIT ITEM FROM CATEGORY FUNCTION ***************** //

  const editItem = async ({ item_name, item_description, item_price }, item_id) => {
    const data = {
      item_id,
      item_name,
      item_description,
      item_price
    };
    const SuccessMsg = `Changed Category to ${item_name} :)`;
    const ErrorMsg = ` Unable to change item . Try again :)`;
    editfn('edit_item', data, SuccessMsg, ErrorMsg);
  };
  return (
    <TabsContainer Heading="Add Item to Category">
      <FormControl fullWidth sx={{ mt: 1.5 }}>
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
        rows={3}
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
        handleClose={closeSnackbar}
        message={snackbar.message}
      />
      <Modal open={openmodal} handleClose={handleClosemodal} itemid={modalid} editItem={editItem} />
    </TabsContainer>
  );
}

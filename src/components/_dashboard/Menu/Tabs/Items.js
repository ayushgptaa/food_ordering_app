/* eslint-disable camelcase */
import { useState, useContext } from 'react';
import { Select, InputAdornment, MenuItem, InputLabel, FormControl } from '@mui/material';
import CustomTextFeild from 'src/components/TextField';
import LoadingButton from 'src/components/LoadingButton';
import SnackBar from 'src/components/Snackbar';
import ItemList from '../Lists/ItemList';
import Modal from '../Modals/ItemModal';
import TabsContainer from '../TabsContainer';
import { MenuContext } from '../MenuStore/Context-Provider';
import PositionedSnackbar from '../../../PositionedSnackbar';

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
    item_price: '',
    category_id: ''
  };
  const [input, setInput] = useState(defaultStates);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [helpertext, setHelpertext] = useState('');

  const inputhandler = (e) => {
    setError(false);
    setHelpertext('');
    let { value } = e.target;
    value =
      value.indexOf('.') >= 0
        ? value.substr(0, value.indexOf('.')) + value.substr(value.indexOf('.'), 3)
        : value;

    setInput({
      ...input,
      [e.target.name]: value
    });
    setDisabled(false);
  };

  // ************** ADD ITEM TO CATEGORY FUNCTION ***************** //

  const addItemtoCategory = async () => {
    if (input.item_price === '' || input.item_name === '') {
      setError(true);
      setHelpertext('required');
      return;
    }
    if (input.item_price > 500) {
      setError(true);
      setHelpertext("Can't add amount greater than $500");
      return;
    }
    setInput(defaultStates);

    const data = {
      ...input,
      item_price: Number(input.item_price)
    };

    const SuccessMsg = `${input.item_name} added to the Categories :)`;
    const ErrorMsg = `Unable to add  ${input.item_name} to Categories. Try again :(`;
    addfn('add_item', data, SuccessMsg, ErrorMsg);
  };

  // ************** DELETE ITEM FROM CATEGORY FUNCTION ***************** //

  const deleteItemFromCategory = async (category_id, item_id, item) => {
    const data = {
      category_id,
      item_id
    };
    const SuccessMsg = ` Deleted ${item} from the Items :)`;
    const ErrorMsg = ` Unable to delete ${item} from the Items. Try again :)`;
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
        value={input.item_name}
        required
        error={input.item_name ? false : error}
        helperText={input.item_name ? '' : helpertext}
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
        value={input.item_price}
        required
        error={input.item_price && input.item_price < 500 ? false : error}
        helperText={input.item_price && input.item_price < 500 ? '' : helpertext}
      />
      <CustomTextFeild
        label="Item Description"
        placeholder="Item Description"
        multiline
        rows={3}
        onChange={inputhandler}
        name="item_description"
        value={input.item_description}
      />
      <LoadingButton
        disabled={disabled}
        addCategory={addItemtoCategory}
        btnloading={btnloading}
        loadingIndicator="Adding..."
      >
        ADD
      </LoadingButton>

      <ItemList
        categories={categories}
        deleteItemFromCategory={deleteItemFromCategory}
        handleOpenmodal={handleOpenmodal}
      />

      <SnackBar
        open={snackbar.open}
        severity={snackbar.severity}
        handleClose={closeSnackbar}
        message={snackbar.message}
      />
      <Modal open={openmodal} handleClose={handleClosemodal} itemid={modalid} editItem={editItem} />
      <PositionedSnackbar />
    </TabsContainer>
  );
}

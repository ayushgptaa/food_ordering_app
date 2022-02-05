/* eslint-disable camelcase */
import { useContext } from 'react';
import {
  Select,
  InputAdornment,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

  const initialValues = {
    item_name: '',
    item_description: '',
    item_price: 0,
    category_id: ''
  };

  const getError = (feildName) => {
    return touched[feildName] && Boolean(errors[feildName]);
  };

  // ************** ADD ITEM TO CATEGORY FUNCTION ***************** //

  const addItemtoCategory = async () => {
    const data = {
      ...values
    };

    const SuccessMsg = `${values.item_name} added to the Categories :)`;
    const ErrorMsg = `Unable to add  ${values.item_name} to Categories. Try again :(`;
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

  const { values, touched, errors, getFieldProps, handleSubmit } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      item_name: Yup.string().required('Item name is required'),
      item_description: Yup.string(),
      item_price: Yup.number()
        .required('Item Price is required')
        .min(0, "amount can't be less than $0")
        .max(500, "Can't add amount greater than $500"),
      category_id: Yup.string().required('Category Id is required')
    }),
    onSubmit: addItemtoCategory
  });

  return (
    <TabsContainer Heading="Add Item to Category">
      <FormControl fullWidth sx={{ mt: 1.5 }} error={getError('category_id')}>
        <InputLabel>Select Category</InputLabel>
        <Select
          id="category_id"
          name="category_id"
          label="Select Category"
          required
          {...getFieldProps('category_id')}
        >
          {categories.map(({ category, category_id }) => {
            return (
              <MenuItem value={category_id} key={category_id}>
                {category}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText error={getError('category_id')}>
          {(getError('category_id') && errors.category_id) || ''}
        </FormHelperText>
      </FormControl>

      <CustomTextFeild
        label="Item Title"
        placeholder="Enter Item"
        id="item_name"
        name="item_name"
        {...getFieldProps('item_name')}
        required
        error={getError('item_name')}
        helperText={errors.item_name || ''}
      />
      <CustomTextFeild
        margin="dense"
        label="Amount"
        placeholder="Enter Amount"
        min={0}
        InputProps={{
          endAdornment: <InputAdornment position="end">$</InputAdornment>
        }}
        id="item_price"
        name="item_price"
        type="number"
        {...getFieldProps('item_price')}
        error={getError('item_price')}
        helperText={errors.item_price || ''}
      />
      <CustomTextFeild
        label="Item Description"
        placeholder="Item Description"
        multiline
        rows={3}
        id="item_description"
        name="item_description"
        {...getFieldProps('item_description')}
      />
      <LoadingButton onClick={handleSubmit} btnloading={btnloading} loadingIndicator="Adding...">
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

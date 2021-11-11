/* eslint-disable camelcase */
import { useState, useContext } from 'react';
import { Box } from '@mui/material';
import SnackBar from '../../../Snackbar';
import CustomTextFeild from '../../../TextField';
import Modal from '../Modal';
import LoadingButton from '../../../LoadingButton';
import CategoryList from '../CategoryList';
import TabsContainer from '../TabsContainer';
import { MenuContext } from '../MenuStore/Context-Provider';

//--------------------------------------------------------------

export default function AddCategory() {
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

  const [inputval, setInputval] = useState('');
  const [disabled, setDisabled] = useState(true);
  // const [btnloading, setBtnloading] = useState(false);

  const inputhandler = (e) => {
    if (e.target.value === '') {
      setDisabled(true);
      return setInputval(e.target.value);
    }
    setDisabled(false);
    setInputval(e.target.value);
  };

  // ************** ADD CATEGORY FUNCTION ***************** //

  const addCategory = async () => {
    const data = {
      category_name: inputval
    };
    setInputval('');
    const SucessMsg = `${inputval} added to the Categories :)`;
    const ErrorMsg = `Unable to add  ${inputval} to Categories. Try again :(`;
    addfn('add_category', data, SucessMsg, ErrorMsg);
  };

  // ************** DELETE CATEGORY FUNCTION ***************** //

  const deleteCategory = async (category, id) => {
    const data = {
      category_id: id
    };
    const name = category;
    deletefn('remove_category', data, name);
  };

  // // ************** EDIT CATEGORY FUNCTION ***************** //

  const editCategory = async (category_id, category_name) => {
    const SucessMsg = `Changed Category to ${category_name} :)`;
    const ErrorMsg = `Unable to change category. Try again :(`;
    const data = {
      category_id,
      category_name
    };
    editfn('edit_category', data, SucessMsg, ErrorMsg);
  };

  return (
    <TabsContainer Heading="Add Category">
      <CustomTextFeild
        inputhandler={inputhandler}
        label="Category"
        placeholder="Enter Category"
        name="Category"
        value={inputval}
      />
      <LoadingButton
        disabled={disabled}
        addCategory={addCategory}
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
        <CategoryList
          categories={categories}
          handleOpenmodal={handleOpenmodal}
          deleteCategory={deleteCategory}
        />
      </Box>
      <SnackBar
        open={snackbar.open}
        severity={snackbar.severity}
        handleClose={closeSnackbar}
        message={snackbar.message}
      />
      <Modal
        open={openmodal}
        handleClose={handleClosemodal}
        category={modalid}
        editCategory={editCategory}
      />
    </TabsContainer>
  );
}

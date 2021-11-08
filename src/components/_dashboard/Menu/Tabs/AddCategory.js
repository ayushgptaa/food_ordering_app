/* eslint-disable camelcase */
import { useState } from 'react';
import { Grid, Box } from '@mui/material';
import PropTypes from 'prop-types';
import SnackBar from '../../../Snackbar';
import Fetch from '../Fetch';
import CustomTextFeild from '../../../TextField';
import Modal from '../Modal';
import LoadingButton from '../../../LoadingButton';
import AvailableList from '../AvailableList';
import TabsHeading from './TabsHeading';
import TabsContainer from '../TabsContainer';

AddCategory.propTypes = {
  categories: PropTypes.array,
  getCategory: PropTypes.func
};

//--------------------------------------------------------------

export default function AddCategory({ categories, getCategory }) {
  const [disabled, setDisabled] = useState(true);
  const [btnloading, setBtnloading] = useState(false);
  const [inputval, setInputval] = useState('');
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ open: false });
  };

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
    setBtnloading(true);
    const data = {
      category_name: inputval
    };
    Fetch(data, 'add_category')
      .then(() => {
        getCategory();
        setBtnloading(false);
        setInputval('');
        setSnackbar({
          severity: 'success',
          open: true,
          message: `${inputval} added to the Categories :)`
        });
      })
      .catch(() => {
        setInputval('');
        setBtnloading(false);
        setSnackbar({
          severity: 'error',
          open: true,
          message: `Unable to add  ${inputval} to Categories. Try again :(`
        });
      });
  };

  // ************** DELETE CATEGORY FUNCTION ***************** //

  const deleteCategory = async (category, id) => {
    const data = {
      category_id: id
    };

    Fetch(data, 'remove_category')
      .then(() => {
        getCategory();
        setSnackbar({
          severity: 'warning',
          open: true,
          message: `${category} deleted from the Categories :)`
        });
      })
      .catch(() => {
        setSnackbar({
          severity: 'error',
          open: true,
          message: `Unable to delete ${category} from the Categories. Try again :(`
        });
      });
  };

  // ************** EDIT CATEGORY FUNCTION ***************** //

  const editCategory = async (id, input) => {
    const data = {
      category_id: id,
      category_name: input
    };
    Fetch(data, 'edit_category_name')
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
        <AvailableList
          categories={categories}
          handleOpenmodal={handleOpenmodal}
          deleteCategory={deleteCategory}
        />
      </Box>
      <SnackBar
        open={snackbar.open}
        severity={snackbar.severity}
        handleClose={handleClose}
        message={snackbar.message}
      />
      <Modal
        open={openmodal}
        handleClose={handleClosemodal}
        category={id}
        editCategory={editCategory}
      />
    </TabsContainer>
  );
}

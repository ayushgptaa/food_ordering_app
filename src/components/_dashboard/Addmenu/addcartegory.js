/* eslint-disable camelcase */
import { useState } from 'react';
import { Grid, Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MuiLoadingButton from '@mui/lab/LoadingButton';
import SnackBar from '../../Snackbar';
import Fetch from './Fetch';
import CustomTextFeild from '../../TextField';
import Modal from './Modal';
import LoadingButton from '../../LoadingButton';

AddCategory.propTypes = {
  categories: PropTypes.array,
  getCategory: PropTypes.func
};

const ListContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.customShadows.z1,
  borderRadius: theme.shape.borderRadius
}));

export default function AddCategory({ categories, getCategory }) {
  const [disabled, setDisabled] = useState(true);
  const [btnloading, setBtnloading] = useState(false);
  const [inputval, setInputval] = useState('');
  const [snackbar, setSnackbar] = useState({ severity: 'success', open: false, message: '' });
  const [openmodal, setOpenmodal] = useState(false);
  const [id, setid] = useState('');
  // const [sexy, setsexy] = useState(false);

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
          severity: 'success',
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
          message: `$Unable to delete ${category} from the Categories. Try again :(`
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
    <>
      <Grid container direction="column" alignItems="center">
        <Box
          sx={{
            maxWidth: 400
          }}
        >
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
        </Box>
        <Box
          sx={{
            width: '100%',
            maxWidth: 700,
            display: 'flex',
            justifyContent: 'center',
            p: 2
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ mt: 4, mb: 2, textAlign: 'center', color: 'primary.darker' }}
              variant="h4"
              component="div"
            >
              Available Categories
            </Typography>
            <ListContainer>
              <List dense={false}>
                {categories.map(({ category, category_id }) => {
                  return (
                    <ListItem
                      key={category_id}
                      secondaryAction={
                        <>
                          <IconButton edge="end" onClick={() => handleOpenmodal(category_id)}>
                            <EditIcon aria-label="edit" />
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={() => deleteCategory(category, category_id)}
                          >
                            {/* <MuiLoadingButton loading sx={{ p: 0 }}>
                              Submit
                            </MuiLoadingButton> */}
                            <DeleteIcon aria-label="delete" />
                          </IconButton>
                        </>
                      }
                    >
                      <ListItemText primary={category} />
                    </ListItem>
                  );
                })}
              </List>
              <Modal
                open={openmodal}
                handleClose={handleClosemodal}
                category={id}
                editCategory={editCategory}
              />
            </ListContainer>
          </Grid>
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

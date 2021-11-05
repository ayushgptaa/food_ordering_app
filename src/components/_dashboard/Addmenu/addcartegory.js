/* eslint-disable camelcase */
import { useState } from 'react';
import { Grid, Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SnackBar from '../../Snackbar';
import Fetch from './Fetch';
import CustomTextFeild from '../../TextField';
// import Modal from './Modal';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.customShadows.z1,
  borderRadius: theme.shape.borderRadius
}));
AddCategory.propTypes = {
  categories: PropTypes.array,
  getCategory: PropTypes.func
};
export default function AddCategory({ categories, getCategory }) {
  const [disabled, setDisabled] = useState(true);
  const [btnloading, setBtnloading] = useState(false);
  const [inputval, setInputval] = useState('');
  const [snackbar, setSnackbar] = useState({ severity: 'success', open: false, message: '' });
  // const [openmodal, setOpenmodal] = useState(false);

  // const handleClickOpen = () => {
  //   setOpenmodal(true);
  // };

  // const handleClose = () => {
  //   setOpenmodal(false);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ open: false });
  };

  const inputhandler = (e) => {
    if (e.target.value === '') return setDisabled(true);
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
        setSnackbar({
          severity: 'success',
          open: true,
          message: `${inputval} added to the Categories :)`
        });
      })
      .catch(() => {
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
      .catch(() => {});
  };
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Box
          sx={{
            maxWidth: 400
          }}
        >
          <CustomTextFeild label="Category" placeholder="Enter Category" onChange={inputhandler} />
          <LoadingButton
            disabled={disabled}
            variant="contained"
            sx={{ py: 1.5, mt: 2, fontSize: 'subtitle1.fontSize', width: '100%' }}
            onClick={addCategory}
            loading={btnloading}
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
            <Demo>
              <List dense={false}>
                {categories.map(({ category, category_id }) => {
                  return (
                    <ListItem
                      key={category_id}
                      secondaryAction={
                        <>
                          <IconButton edge="end" aria-label="delete">
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deleteCategory(category, category_id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      }
                    >
                      <ListItemText primary={category} />
                    </ListItem>
                  );
                })}
              </List>
            </Demo>
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

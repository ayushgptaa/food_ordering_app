/* eslint-disable camelcase */
import { useState } from 'react';
import {
  TextField,
  Grid,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SnackBar from '../../Snackbar';
import Fetch from './Fetch';
// import Modal from './Modal';

const commonInputStyles = {
  mt: 1.5
};

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
  const [disabled, setdisabled] = useState(true);
  const [inputval, setInputval] = useState('');
  const [varient, setVarient] = useState('success');
  const [open, setOpen] = useState(false);
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

    setOpen(false);
  };

  const inputhandler = (e) => {
    setdisabled(false);
    setInputval(e.target.value);
  };

  // ************** ADD CATEGORY FUNCTION ***************** //

  const addCategory = async () => {
    const data = {
      category_name: inputval
    };
    Fetch(data, 'add_category')
      .then(() => {
        getCategory();
        setVarient('success');
        setOpen(true);
      })
      .catch(() => {
        setVarient('error');
        setOpen(true);
      });
  };

  // ************** DELETE CATEGORY FUNCTION ***************** //

  const deleteCategory = async (id) => {
    const data = {
      category_id: id
    };
    Fetch(data, 'remove_category')
      .then(() => {
        getCategory();
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
          <TextField
            id="outlined-basic"
            label="Category Title"
            placeholder="Enter Category"
            variant="outlined"
            fullWidth
            onChange={inputhandler}
            autoComplete="off"
            sx={{ ...commonInputStyles }}
          />
          <Button
            disabled={disabled}
            variant="contained"
            sx={{ py: 1.5, mt: 2, fontSize: 'subtitle1.fontSize', width: '100%' }}
            onClick={addCategory}
          >
            ADD
          </Button>
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
                            onClick={() => deleteCategory(category_id)}
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
      <SnackBar open={open} varient={varient} inputval={inputval} handleClose={handleClose} />
    </>
  );
}

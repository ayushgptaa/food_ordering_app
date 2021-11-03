/* eslint-disable camelcase */
import { useState, cloneElement, useEffect } from 'react';
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
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SnackBar from '../../Snackbar';

const commonInputStyles = {
  mt: 1.5
};
const deleteCategory = (id) => {
  console.log(id);
};

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     cloneElement(element, {
//       key: value
//     })
//   );
// }

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.customShadows.z1,
  borderRadius: theme.shape.borderRadius
}));

export default function AddCategory() {
  useEffect(() => {
    console.log('useEffect running');
    fetch('https://us-central1-links-app-d5366.cloudfunctions.net/development/get_draft_menu', {
      method: 'PUT',
      body: JSON.stringify({
        menu_id:
          'menu_draft_Tb2ZEqko8lXxl934BK7f6W5Przdl5WfEctKRDXRE0r2g14HiTyU8urvBjFtNfOehlzi5H4o5ONKjiVELikK2stlOwI0R6wQ02KBA1635-608158-1921'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setcategories(data.categories);
      })
      .catch((error) => {
        setVarient('error');
        setOpen(true);
      });
  }, []);
  const [disabled, setdisabled] = useState(true);
  const [inputval, setInputval] = useState('');
  const [varient, setVarient] = useState('success');
  const [open, setOpen] = useState(false);
  const [categories, setcategories] = useState([]);

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
  const onSubmit = () => {
    const data = {
      menu_id:
        'menu_draft_Tb2ZEqko8lXxl934BK7f6W5Przdl5WfEctKRDXRE0r2g14HiTyU8urvBjFtNfOehlzi5H4o5ONKjiVELikK2stlOwI0R6wQ02KBA1635-608158-1921',
      category_name: inputval
    };

    fetch('https://us-central1-links-app-d5366.cloudfunctions.net/development/add_category', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setOpen(true);
      })
      .catch((error) => {
        setVarient('error');
        setOpen(true);
        console.log(error);
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
            onClick={onSubmit}
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
              variant="h5"
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
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => deleteCategory(category_id)}
                        >
                          <DeleteIcon />
                        </IconButton>
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

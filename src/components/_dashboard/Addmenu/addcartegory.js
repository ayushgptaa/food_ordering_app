import { useState } from 'react';
import axios from 'axios';
import { TextField, Grid, Button, Box, InputAdornment } from '@mui/material';

const commonInputStyles = {
  mt: 1.5
};
export default function AddCategory() {
  const [inputval, setInputval] = useState('');

  const inputhandler = (e) => {
    setInputval(e.target.value);
  };
  const onSubmit = () => {
    console.log('working');
    const data = {
      menu_id:
        'menu_jnHObvXIVqhXPxGdPSj1h6Btz1Et5fYZE49ZtLRjw0bLO9Mi5ITfGSejfFb7nEuvwNjDyMfT1gfLwWfmXApDIxTgaH9WrvR3ctPJ',
      category_name: inputval
    };
    console.log(data);
    axios('https://us-central1-links-app-d5366.cloudfunctions.net/development/add_category', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
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
          variant="contained"
          sx={{ py: 1.5, mt: 2, fontSize: 'subtitle1.fontSize', width: '100%' }}
          onClick={onSubmit}
        >
          ADD
        </Button>
      </Box>
    </Grid>
  );
}

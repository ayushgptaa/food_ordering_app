import { useState, cloneElement } from 'react';
import axios from 'axios';
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

const commonInputStyles = {
  mt: 1.5
};

function generate(element) {
  return [0, 1, 2].map((value) =>
    cloneElement(element, {
      key: value
    })
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));
export default function AddCategory() {
  const [inputval, setInputval] = useState('');
  const [secondary, setSecondary] = useState(false);

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
            variant="contained"
            sx={{ py: 1.5, mt: 2, fontSize: 'subtitle1.fontSize', width: '100%' }}
            onClick={onSubmit}
          >
            ADD
          </Button>
        </Box>
      </Grid>
      <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2, textAlign: 'center' }} variant="h5" component="div">
            Available Categories
          </Typography>
          <Demo>
            <List dense={false}>
              {generate(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
              )}
            </List>
          </Demo>
        </Grid>
      </Box>
    </>
  );
}

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import IconButton from '@mui/material/IconButton';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import DeleteIcon from '@mui/icons-material/Delete';

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value
//     })
//   );
// }

// const Demo = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper
// }));

// export default function InteractiveList() {
//   const [secondary, setSecondary] = React.useState(false);

//   return (
//     <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
//       <Grid item xs={12} md={6}>
//         <Typography sx={{ mt: 4, mb: 2, textAlign: 'center' }} variant="h5" component="div">
//           Available Categories
//         </Typography>
//         <Demo>
//           <List dense={false}>
//             {generate(
//               <ListItem
//                 secondaryAction={
//                   <IconButton edge="end" aria-label="delete">
//                     <DeleteIcon />
//                   </IconButton>
//                 }
//               >
//                 <ListItemText
//                   primary="Single-line item"
//                   secondary={secondary ? 'Secondary text' : null}
//                 />
//               </ListItem>
//             )}
//           </List>
//         </Demo>
//       </Grid>
//     </Box>
//   );
// }

import { TextField, Grid, Button, Box, InputAdornment } from '@mui/material';

const commonInputStyles = {
  mt: 1.5
};
export default function AddItem() {
  return (
    <Grid container autoComplete="off" direction="column" alignItems="center">
      <Box
        sx={{
          maxWidth: 400
        }}
      >
        <TextField
          id="outlined-basic"
          label="Item Title"
          variant="outlined"
          margin="dense"
          placeholder="Enter Item"
          fullWidth
          sx={{ ...commonInputStyles }}
        />
        <TextField
          margin="dense"
          id="outlined-multiline-static"
          label="Item Description"
          multiline
          rows={4}
          placeholder="Enter Description"
          fullWidth
          sx={{ ...commonInputStyles }}
        />
        <TextField
          margin="dense"
          id="outlined-start-adornment"
          label="Amount"
          fullWidth
          placeholder="Enter Amount"
          InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>
          }}
          sx={{ ...commonInputStyles }}
        />
        <Button
          variant="contained"
          sx={{ py: 1.5, mt: 2, fontSize: 'subtitle1.fontSize', width: '100%' }}
        >
          ADD
        </Button>
      </Box>
    </Grid>
  );
}

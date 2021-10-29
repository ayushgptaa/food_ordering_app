import { TextField, Grid, Button, Box, InputAdornment } from '@mui/material';

const commonInputStyles = {
  mt: 1.5
};
export default function AddOption() {
  return (
    <Grid container direction="column" alignItems="center">
      <Box
        sx={{
          maxWidth: 400
        }}
      >
        <TextField
          id="outlined-basic"
          label="Option group name"
          variant="outlined"
          margin="dense"
          placeholder="Enter name"
          fullWidth
          sx={{ ...commonInputStyles }}
          autoComplete="off"
        />
        <TextField
          margin="dense"
          id="outlined-basic"
          label="Option name"
          placeholder="Enter name"
          fullWidth
          sx={{ ...commonInputStyles }}
          autoComplete="off"
        />
        <TextField
          margin="dense"
          id="outlined-start-adornment"
          label="Amount"
          fullWidth
          placeholder="Enter Amount"
          autoComplete="off"
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

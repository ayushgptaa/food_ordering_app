import MuiTextField from '@mui/material/TextField';

export default function CustomTextFeild(props) {
  return (
    <MuiTextField
      id="outlined-basic"
      label={props.label}
      placeholder={props.placeholder}
      variant="outlined"
      fullWidth
      //   onChange={inputhandler}
      {...props}
      autoComplete="off"
      sx={{ mt: 1.5 }}
    />
  );
}

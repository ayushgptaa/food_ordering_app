import MuiTextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

CustomTextFeild.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  inputhandler: PropTypes.func,
  errorTextstyle: PropTypes.bool
};

export default function CustomTextFeild(props) {
  const { label, placeholder, name, inputhandler, errorTextstyle, ...rest } = props;
  let errorstyle;
  if (errorTextstyle) {
    errorstyle = {
      '& .MuiFormHelperText-root': {
        top: '55px',
        position: 'absolute'
      }
    };
  }

  return (
    <MuiTextField
      name={name}
      id="outlined-basic"
      label={label}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      onChange={inputhandler}
      autoComplete="off"
      sx={{
        mt: 1.5,
        ...errorstyle
      }}
      {...rest}
    />
  );
}

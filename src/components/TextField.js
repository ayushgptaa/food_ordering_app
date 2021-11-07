import MuiTextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

CustomTextFeild.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  inputhandler: PropTypes.func
};

export default function CustomTextFeild(props) {
  const { label, placeholder, name, inputhandler, ...rest } = props;
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
      sx={{ mt: 1.5 }}
      required
      {...rest}
    />
  );
}

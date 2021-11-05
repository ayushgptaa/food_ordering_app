import MuiTextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

CustomTextFeild.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
};

export default function CustomTextFeild(props) {
  const { label, placeholder, name, onChange } = props;
  return (
    <MuiTextField
      name={name}
      id="outlined-basic"
      label={label}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      onChange={onChange}
      {...props}
      autoComplete="off"
      sx={{ mt: 1.5 }}
    />
  );
}

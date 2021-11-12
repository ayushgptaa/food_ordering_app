import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PropTypes from 'prop-types';
import CustomTextFeild from '../../../TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: 350, xs: 250 },
  bgcolor: 'background.paper',
  borderRadius: '10px',
  p: 3
};

BasicModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  groupid: PropTypes.string,
  editOptionGroup: PropTypes.func
};
// -------------------------------------------------------------

export default function BasicModal({ open, handleClose, editOptionGroup, groupid }) {
  const defaultStates = {
    group_name: '',
    required_or_optional: '',
    select_upto: ''
  };

  const [input, setInput] = useState(defaultStates);
  const inputhandler = (e) => {
    const { value } = e.target;

    setInput({
      ...input,
      [e.target.name]: value
    });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="delete"
            sx={{ position: 'absolute', top: 2, right: 2 }}
            onClick={handleClose}
          >
            <HighlightOffIcon aria-label="edit" />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Edit Option Groups
          </Typography>
          <CustomTextFeild
            label="Option group name"
            placeholder="Enter Option group   "
            onChange={inputhandler}
            name="group_name"
            value={input.group_name}
          />

          <FormControl fullWidth sx={{ mt: 1.5 }}>
            <InputLabel id="simple-select-label">Required or Optional</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              // value={input.required_or_optional}
              name="required_or_optional"
              label="Required or Optional"
              onChange={inputhandler}
              value={input.required_or_optional}
            >
              <MenuItem value="required">Required</MenuItem>
              <MenuItem value="optional">Optional</MenuItem>
            </Select>
          </FormControl>
          <CustomTextFeild
            label="Select Upto"
            placeholder="Select Upto"
            type="number"
            name="select_upto"
            onChange={inputhandler}
            value={input.select_upto}
          />
          <Button
            variant="contained"
            sx={{
              mt: 2,
              px: 3,
              fontSize: 'h6.fontSize',
              width: 100,
              mx: 'auto',
              display: 'block'
            }}
            onClick={() => {
              setInput(defaultStates);
              editOptionGroup(input, groupid);
            }}
          >
            ADD
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

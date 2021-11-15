import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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

OptionsModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  optionid: PropTypes.string,
  editOption: PropTypes.func
};
// -------------------------------------------------------------

export default function OptionsModal({ open, handleClose, optionid, editOption }) {
  const defaultStates = {
    option_name: '',
    option_price: ''
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
            Edit Option
          </Typography>

          <CustomTextFeild
            label="Option name"
            placeholder="Enter Option name "
            name="option_name"
            onChange={inputhandler}
            value={input.option_name}
          />

          <CustomTextFeild
            label="Amount"
            placeholder="Enter Amount"
            onChange={inputhandler}
            name="option_price"
            type="number"
            value={input.option_price}
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
              editOption(input, optionid);
            }}
          >
            ADD
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

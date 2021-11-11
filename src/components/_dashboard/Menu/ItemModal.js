import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PropTypes from 'prop-types';
import CustomTextFeild from '../../TextField';

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
  itemid: PropTypes.string,
  editItem: PropTypes.func
};
// -------------------------------------------------------------

export default function BasicModal({ open, handleClose, editItem, itemid }) {
  const defaultStates = {
    item_name: '',
    item_description: '',
    item_price: null
  };
  const [input, setInput] = useState(defaultStates);
  const inputhandler = (e) => {
    const { value } = e.target;
    setInput({
      ...input,
      [e.target.name]: value,
      item_price: Number(value)
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
            Rename Category
          </Typography>
          <CustomTextFeild
            label="Item Title"
            placeholder="Enter Item"
            onChange={inputhandler}
            name="item_name"
          />
          <CustomTextFeild
            label="Item Description"
            placeholder="Item Description"
            multiline
            rows={4}
            onChange={inputhandler}
            name="item_description"
          />
          <CustomTextFeild
            margin="dense"
            label="Amount"
            placeholder="Enter Amount"
            InputProps={{
              endAdornment: <InputAdornment position="end">$</InputAdornment>
            }}
            onChange={inputhandler}
            name="item_price"
            type="number"
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
              editItem(input, itemid);
            }}
          >
            ADD
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

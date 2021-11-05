import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
  category: PropTypes.string,
  editCategory: PropTypes.func
};
// -------------------------------------------------------------

export default function BasicModal({ open, handleClose, category, editCategory }) {
  const [inputval, setinputval] = useState('');
  const inputhandler = (e) => {
    setinputval(e.target.value);
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
            label="Change Category"
            placeholder="Enter Category"
            autoFocus
            value={inputval}
            inputhandler={inputhandler}
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
              setinputval('');
              editCategory(category, inputval);
            }}
          >
            ADD
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

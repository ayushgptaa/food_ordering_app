import { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { MenuContext } from '../MenuStore/Context-Provider';

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

// BasicModal.propTypes = {
//   open: PropTypes.bool,
//   handleClose: PropTypes.func,
//   itemid: PropTypes.string,
//   editItem: PropTypes.func
// };
// -------------------------------------------------------------

export default function DeleteModal({ open, handleClose, Heading, name, id, deletefn }) {
  const { closeDeletemodal } = useContext(MenuContext);
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ textAlign: 'center', mt: 1.5 }}
          >
            {Heading}
          </Typography>
          <Grid container justifyContent="center ">
            <Button
              variant="contained"
              sx={{
                mt: 2,
                px: 3,
                fontSize: 'h6.fontSize',
                width: 100,
                mx: 1
              }}
              onClick={() => {
                deletefn(name, id);
              }}
            >
              DELETE
            </Button>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                px: 3,
                fontSize: 'h6.fontSize',
                width: 100,
                backgroundColor: 'grey.500',
                boxShadow: 'none',
                mx: 1
              }}
              onClick={closeDeletemodal}
            >
              CANCEL
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

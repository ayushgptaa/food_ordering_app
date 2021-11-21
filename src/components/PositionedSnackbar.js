import { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { MenuContext } from './_dashboard/Menu/MenuStore/Context-Provider';

export default function PositionedSnackbar() {
  const { positionsnackbar, ClosePositionedSnackbar } = useContext(MenuContext);
  const position = {
    vertical: 'bottom',
    horizontal: 'right'
  };
  const { open } = positionsnackbar;

  return (
    <Snackbar anchorOrigin={position} open={open} key="Positioned Snackbar">
      <Alert
        onClose={ClosePositionedSnackbar}
        severity="warning"
        sx={{ width: '100%' }}
        variant="filled"
      >
        Your changes are not Published. Go to Draft Menu to publish them.
      </Alert>
    </Snackbar>
  );
}

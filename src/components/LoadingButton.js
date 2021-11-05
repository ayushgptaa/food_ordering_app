/* eslint-disable react/prop-types */
import MuiLoadingButton from '@mui/lab/LoadingButton';

export default function LoadingButton({
  disabled,
  addCategory,
  btnloading,
  loadingIndicator,
  children
}) {
  return (
    <MuiLoadingButton
      disabled={disabled}
      variant="contained"
      sx={{ py: 1.5, mt: 2, fontSize: 'subtitle1.fontSize', width: '100%' }}
      onClick={addCategory}
      loading={btnloading}
      loadingIndicator={loadingIndicator}
    >
      {children}
    </MuiLoadingButton>
  );
}

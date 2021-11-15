/* eslint-disable react/prop-types */
import MuiLoadingButton from '@mui/lab/LoadingButton';

export default function LoadingButton({
  disabled,
  addCategory,
  btnloading,
  loadingIndicator,
  children,
  width,
  ...rest
}) {
  return (
    <MuiLoadingButton
      disabled={disabled}
      variant="contained"
      sx={{
        py: 1.5,
        mt: 1.5,
        fontSize: 'subtitle1.fontSize',
        width: width ? Number(width) : '100%'
      }}
      onClick={addCategory}
      loading={btnloading}
      loadingIndicator={loadingIndicator}
      {...rest}
    >
      {children}
    </MuiLoadingButton>
  );
}

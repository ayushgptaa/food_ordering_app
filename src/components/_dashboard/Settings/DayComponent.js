import { Typography, Grid, Switch, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import PropTypes from 'prop-types';

DayComponent.propTypes = {
  day: PropTypes.string,
  switchChanger: PropTypes.func,
  checked: PropTypes.bool,
  fromfn: PropTypes.func,
  tofn: PropTypes.func,
  from: PropTypes.string,
  to: PropTypes.string
};

export default function DayComponent({ day, switchChanger, checked, fromfn, tofn, from, to }) {
  return (
    <Grid container spacing={2} justifyContent="space-around" alignItems="center" sx={{ mt: 2 }}>
      <Grid item xs={2}>
        <Typography variant="subtitle1" gutterBottom>
          {day}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Switch
          aria-label="switch"
          onChange={() => switchChanger(day)}
          checked={checked}
          name={day}
        />
      </Grid>
      <Grid xs={8} item>
        {checked ? (
          <Grid container justifyContent="space-evenly">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="From"
                value={from}
                onChange={(newValue) => {
                  fromfn(newValue, day);
                }}
                renderInput={(params) => <TextField {...params} sx={{ maxWidth: 200 }} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="To"
                value={to}
                onChange={(newValue) => {
                  tofn(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{ maxWidth: 200 }} />}
              />
            </LocalizationProvider>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
}

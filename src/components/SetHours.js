/* eslint-disable camelcase */
import { useState } from 'react';
// material
import { Container, Card, Typography, Grid, Switch } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import Page from './Page';

// ----------------------------------------------------------------------

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SetHours() {
  const [value, setValue] = useState(null);
  const [checked, setChecked] = useState(true);

  const switchChanger = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <Page title="Set hours">
      <Container sx={{ mt: 5, maxWidth: { xs: 'md' } }}>
        <Card sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ opacity: 0.8 }} gutterBottom>
            Set standard hours for store
          </Typography>
          {DAYS.map((day, index) => {
            return (
              <Grid
                container
                spacing={2}
                justifyContent="space-around"
                alignItems="center"
                key={index}
                sx={{ mt: 2 }}
              >
                <Grid item xs={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    {day}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Switch
                    aria-label="switch"
                    onChange={switchChanger}
                    checked={checked}
                    name={day}
                  />
                </Grid>
                <Grid xs={8} item>
                  <Grid container justifyContent="space-evenly">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="From"
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} sx={{ maxWidth: 200 }} />}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="To"
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} sx={{ maxWidth: 200 }} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Card>
      </Container>
    </Page>
  );
}

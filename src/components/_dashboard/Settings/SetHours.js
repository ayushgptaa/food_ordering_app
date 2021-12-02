/* eslint-disable react/jsx-boolean-value */
/* eslint-disable camelcase */
import { useState } from 'react';
// material
import { Container, Card, Typography, Button } from '@mui/material';
import Page from '../../Page';
import DayComponent from './DayComponent';

// ----------------------------------------------------------------------

// const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SetHours() {
  const [Monday, setMonday] = useState({ day: 'Monday', checked: true, from: null, to: null });
  const [Tuesday, setTuesday] = useState({ day: 'Tuesday', checked: true, from: null, to: null });

  const switchChanger = (day) => {
    switch (day) {
      case 'Monday':
        setMonday((prevState) => {
          return { ...prevState, checked: !prevState.checked };
        });
        break;

      case 'Tuesday':
        setTuesday((prevState) => {
          return { ...prevState, checked: !prevState.checked };
        });
        break;
      default:
    }
  };
  const fromfn = (newValue, day) => {
    switch (day) {
      case 'Monday':
        setMonday((prevState) => {
          return { ...prevState, from: newValue };
        });
        break;

      case 'Tuesday':
        setTuesday((prevState) => {
          return { ...prevState, from: newValue };
        });
        break;
      default:
    }
  };

  const tofn = (newValue) => {
    setMonday((prevState) => {
      return { ...prevState, to: newValue };
    });
  };
  return (
    <Page title="Set hours">
      <Container sx={{ mt: 5, maxWidth: { xs: 'md' } }}>
        <Card sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ opacity: 0.8 }} gutterBottom>
            Set standard hours for store
          </Typography>
          <DayComponent
            day={Monday.day}
            checked={Monday.checked}
            from={Monday.from}
            to={Monday.to}
            switchChanger={switchChanger}
            fromfn={fromfn}
            tofn={tofn}
          />
          <DayComponent
            day={Tuesday.day}
            checked={Tuesday.checked}
            from={Tuesday.from}
            to={Monday.to}
            switchChanger={switchChanger}
            fromfn={fromfn}
            tofn={tofn}
          />

          <Button
            variant="contained"
            sx={{
              fontSize: 'subtitle3.fontSize',
              display: 'block',
              py: 1.5,
              mx: 'auto',
              mt: 5
            }}
          >
            Set Schedule
          </Button>
        </Card>
      </Container>
    </Page>
  );
}

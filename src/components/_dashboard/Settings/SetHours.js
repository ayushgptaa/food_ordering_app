/* eslint-disable react/jsx-boolean-value */
/* eslint-disable camelcase */
import { useState } from 'react';
// material
import { Container, Card, Typography, Button } from '@mui/material';
import Page from '../../Page';
import DayComponent from './DayComponent';

// ----------------------------------------------------------------------

export default function SetHours() {
  const [Monday, setMonday] = useState({ day: 'Monday', checked: true, from: null, to: null });
  const [Tuesday, setTuesday] = useState({ day: 'Tuesday', checked: true, from: null, to: null });
  const [Wednesday, setWednesday] = useState({
    day: 'Wednesday',
    checked: true,
    from: null,
    to: null
  });
  const [Thursday, setThursday] = useState({
    day: 'Thursday',
    checked: true,
    from: null,
    to: null
  });
  const [Friday, setFriday] = useState({ day: 'Friday', checked: true, from: null, to: null });
  const [Saturday, setSaturday] = useState({
    day: 'Saturday',
    checked: true,
    from: null,
    to: null
  });
  const [Sunday, setSunday] = useState({ day: 'Sunday', checked: true, from: null, to: null });

  // ************ To set switch function ************** //
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
      case 'Wednesday':
        setWednesday((prevState) => {
          return { ...prevState, checked: !prevState.checked };
        });
        break;
      case 'Thursday':
        setThursday((prevState) => {
          return { ...prevState, checked: !prevState.checked };
        });
        break;
      case 'Friday':
        setFriday((prevState) => {
          return { ...prevState, checked: !prevState.checked };
        });
        break;
      case 'Saturday':
        setSaturday((prevState) => {
          return { ...prevState, checked: !prevState.checked };
        });
        break;
      case 'Sunday':
        setSunday((prevState) => {
          return { ...prevState, checked: !prevState.checked };
        });
        break;
      default:
        break;
    }
  };

  const timeSetter = (day, obj) => {
    switch (day) {
      case 'Monday':
        setMonday((prevState) => {
          return { ...prevState, ...obj };
        });
        break;

      case 'Tuesday':
        setTuesday((prevState) => {
          return { ...prevState, ...obj };
        });
        break;
      case 'Wednesday':
        setWednesday((prevState) => {
          return { ...prevState, ...obj };
        });
        break;
      case 'Thursday':
        setThursday((prevState) => {
          return { ...prevState, ...obj };
        });
        break;
      case 'Friday':
        setFriday((prevState) => {
          return { ...prevState, ...obj };
        });
        break;
      case 'Saturday':
        setSaturday((prevState) => {
          return { ...prevState, ...obj };
        });
        break;
      case 'Sunday':
        setSunday((prevState) => {
          return { ...prevState, ...obj };
        });
        break;
      default:
        break;
    }
  };
  const fromfn = (newValue, day) => {
    timeSetter(day, { from: newValue });
  };

  const tofn = (newValue, day) => {
    timeSetter(day, { to: newValue });
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
            to={Tuesday.to}
            switchChanger={switchChanger}
            fromfn={fromfn}
            tofn={tofn}
          />
          <DayComponent
            day={Wednesday.day}
            checked={Wednesday.checked}
            from={Wednesday.from}
            to={Wednesday.to}
            switchChanger={switchChanger}
            fromfn={fromfn}
            tofn={tofn}
          />
          <DayComponent
            day={Thursday.day}
            checked={Thursday.checked}
            from={Thursday.from}
            to={Thursday.to}
            switchChanger={switchChanger}
            fromfn={fromfn}
            tofn={tofn}
          />
          <DayComponent
            day={Friday.day}
            checked={Friday.checked}
            from={Friday.from}
            to={Friday.to}
            switchChanger={switchChanger}
            fromfn={fromfn}
            tofn={tofn}
          />
          <DayComponent
            day={Saturday.day}
            checked={Saturday.checked}
            from={Saturday.from}
            to={Saturday.to}
            switchChanger={switchChanger}
            fromfn={fromfn}
            tofn={tofn}
          />
          <DayComponent
            day={Sunday.day}
            checked={Sunday.checked}
            from={Sunday.from}
            to={Sunday.to}
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

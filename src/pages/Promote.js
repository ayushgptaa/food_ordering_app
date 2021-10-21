// material
import { Container, Grid, Typography, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(10, 10),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

export default function Promote() {
  return (
    <Container>
      <Grid
        container
        spacing={3}
        direction="column"
        sx={{
          borderBottom: 'none',
          borderStyle: 'solid',
          borderColor: 'primary.maingreen',
          borderWidth: 1,
          borderRadius: 1
        }}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={5}>
          <RootStyle>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              TODAY AMOUNT
            </Typography>
            <Typography variant="h3">hello</Typography>
          </RootStyle>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <RootStyle>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              TODAY AMOUNT
            </Typography>
            <Typography variant="h3">hello</Typography>
          </RootStyle>
        </Grid>
      </Grid>
    </Container>
  );
}

// material
import { Container, Grid, Typography, Card, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(7, 0),
  margin: theme.spacing(2, 2),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px'
}));

const DownloadIcon = () => <Icon icon="bx:bxs-download" color="white" />;

export default function Settings() {
  return <Card sx={{ py: 6, maxWidth: 'md', mx: 'auto', mt: { md: 5 }, mb: 0 }}>hello</Card>;
}

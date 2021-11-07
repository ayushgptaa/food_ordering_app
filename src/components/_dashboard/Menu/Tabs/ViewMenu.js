/* eslint-disable camelcase */
import { Container, Card, Typography, Grid, Skeleton } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import PropTypes from 'prop-types';
import TabsHeading from './TabsHeading';

ViewMenu.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      category_id: PropTypes.string
    })
  )
};
// ----------------------------------------------------------------------
export default function ViewMenu({ categories }) {
  return (
    <Container>
      <TabsHeading Heading="Draft Categories" />
      {categories.length === 0
        ? [0, 1, 2, 4].map((index) => {
            return (
              <Card sx={{ p: 4, maxWidth: 'sm', mx: 'auto', mt: 2 }} key={index}>
                <Skeleton variant="text" width={200} height={75} />
                <Skeleton variant="string" height={40} />
                <Skeleton variant="string" height={40} />
              </Card>
            );
          })
        : categories.map(({ category, items }, index) => {
            return (
              <Card sx={{ p: 4, maxWidth: 'sm', mx: 'auto', mt: 2 }} key={index}>
                <Typography variant="h4" sx={{ opacity: 0.72, color: 'primary.main' }} gutterBottom>
                  Category : {category}
                </Typography>
                <CustomizedAccordions items={items} />
                {/* <Button
                  variant="contained"
                  sx={{ mt: 3, fontSize: 'h6.fontSize', display: 'block', mx: 'auto' }}
                >
                  Publish
                </Button> */}
              </Card>
            );
          })}
    </Container>
  );
}

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} defaultExpanded={false} {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

CustomizedAccordions.propTypes = {
  items: PropTypes.array
};

// -------------------------------------------------

function CustomizedAccordions({ items }) {
  const [expanded, setExpanded] = useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {items &&
        items.map(({ item_name, item_description }, index) => {
          return (
            <Accordion
              expanded={expanded === `pannel${index}`}
              onChange={handleChange(`pannel${index}`)}
              key={index}
            >
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>{item_name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item_description}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
}

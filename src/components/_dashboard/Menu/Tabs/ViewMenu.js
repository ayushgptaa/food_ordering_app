/* eslint-disable camelcase */
import { Container, Card, Typography, Skeleton } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import PropTypes from 'prop-types';
import LoadingButton from 'src/components/LoadingButton';
import TabsHeading from './TabsHeading';
import { MenuContext } from '../MenuStore/Context-Provider';

// ----------------------------------------------------------------------
export default function ViewMenu() {
  const { categories, getDraftMenu, getMenu } = useContext(MenuContext);
  useEffect(() => {
    getDraftMenu();
    getMenu();
  }, []);

  return (
    <Container>
      <TabsHeading Heading="Draft Categories" />
      {categories.length === 0
        ? [0, 1, 2, 4].map((index) => {
            return (
              <Card sx={{ p: 4, maxWidth: 'sm', mx: 'auto', mt: 2.5 }} key={index}>
                <Skeleton variant="text" width={200} height={75} />
                <Skeleton variant="string" height={40} />
                <Skeleton variant="string" height={40} />
              </Card>
            );
          })
        : categories.map(({ category, items }, index) => {
            return (
              <Card sx={{ p: 4, maxWidth: 'sm', mx: 'auto', mt: 2.5 }} key={index}>
                <Typography variant="h4" sx={{ opacity: 0.8, color: 'primary.main' }} gutterBottom>
                  Category : {category}
                </Typography>
                <CustomizedAccordions items={items} />
              </Card>
            );
          })}

      <LoadingButton
        sx={{ width: 150, py: 1, mx: 'auto', display: 'block', mt: 1.5, fontSize: 'h5.fontSize' }}
      >
        Publish
      </LoadingButton>
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
  backgroundColor: theme.palette.grey[100],
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
  const [expanded2, setExpanded2] = useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChange2 = (panel) => (event, newExpanded) => {
    setExpanded2(newExpanded ? panel : false);
  };
  return (
    <>
      {items &&
        items.map(({ item_name, option_groups }, index) => {
          return (
            <Accordion
              expanded={expanded === `pannel${index}`}
              onChange={handleChange(`pannel${index}`)}
              key={index}
            >
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Item : {item_name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {option_groups &&
                  option_groups.map(({ group_name, options }, index) => {
                    return (
                      <Accordion
                        key={index}
                        expanded={expanded2 === `pannel2-${index}`}
                        onChange={handleChange2(`pannel2-${index}`)}
                      >
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                          <Typography>Option group : {group_name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {options.map(({ option_name }, index) => {
                            return <Typography key={index}>{option_name}</Typography>;
                          })}
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
              </AccordionDetails>
            </Accordion>
          );
        })}
    </>
  );
}

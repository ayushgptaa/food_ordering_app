import { Container, Card, Typography, Button, Grid, Skeleton } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

// const dummydata = [
//   {
//     category: 'Vegetarian',
//     items: [
//       {
//         category_id: 'category_b27JQghxF2XuhWBnA8nLL2aBP0V9s0PRgjJEKjRoPRsgLI61Ec1635-785333-3141',
//         option_groups: [
//           {
//             group_name: '1st Side Choice',
//             group_id: 'group_5P8JafIhEixtAWK2SbwFCm6bUR3n4kLtKkqJ6UJ9uyc8iOYfdq1635-785573-3211',
//             options: [
//               {
//                 option_id:
//                   'option_GCtm9GZMilnEnlGFWQYHIBnbuORgNCx9tVfN1ol2FrQZkTDRnT1635-785673-5301',
//                 option_price: 0,
//                 option_name: 'Butter Naan',
//                 group_id: 'group_5P8JafIhEixtAWK2SbwFCm6bUR3n4kLtKkqJ6UJ9uyc8iOYfdq1635-785573-3211'
//               },
//               {
//                 option_price: 0,
//                 option_name: 'Plain Naan',
//                 option_id:
//                   'option_WR9s47SKk43djO7WE2DVBV7yHhmsjUn4daUBzxISe9dkz3h5qE1635-791461-5121',
//                 group_id: 'group_5P8JafIhEixtAWK2SbwFCm6bUR3n4kLtKkqJ6UJ9uyc8iOYfdq1635-785573-3211'
//               },
//               {
//                 option_price: 0,
//                 group_id:
//                   'group_5P8JafIhEixtAWK2SbwFCm6bUR3n4kLtKkqJ6UJ9uyc8iOYfdq1635-785573-3211',
//                 option_id:
//                   'option_3JZWSVvknrAxToFiQsw2Ru5ttk8v0cCMxpVqHaqmVkcgjn34lG1635-791483-5101',
//                 option_name: 'Cheese Naan'
//               },
//               {
//                 option_price: 1.99,
//                 option_name: 'Garlic Naan',
//                 option_id:
//                   'option_CSkUuaMaxtZ617Jrw7PEViTsXSzrLlEQfvFA4Wq2z67SGEDjGY1635-791468-5761',
//                 group_id: 'group_5P8JafIhEixtAWK2SbwFCm6bUR3n4kLtKkqJ6UJ9uyc8iOYfdq1635-785573-3211'
//               }
//             ],
//             select_upto: 'all',
//             required_or_optional: 'required'
//           }
//         ],
//         category: '',
//         available: true,
//         item_price: 5.99,
//         how_long_to_available: '',
//         item_name: 'Paneer Options',
//         item_description: 'Paneer Foods',
//         item_id: 'item_iKzIo8E8NPPJhAsAO797jfesyjxG9avMMkK0EH5A4ouykMMknV1635-785353-0901'
//       }
//     ],
//     category_id: 'category_b27JQghxF2XuhWBnA8nLL2aBP0V9s0PRgjJEKjRoPRsgLI61Ec1635-785333-3141'
//   },
//   {
//     items: [
//       {
//         how_long_to_available: '',
//         category_id: 'category_y9sZKOlTAL5xTvCKRk0VfroXKrNn5m4HEeMh9Lc2VMoUyw4Lch1635-720068-0051',
//         available: true,
//         item_id: 'item_EZLQQSZ7aHCKy8yG7uHNIXqszzCqhEkSRlerEtHkNsKW2PBsFj1635-820600-3581',
//         category: '',
//         item_description: '',
//         option_groups: [],
//         item_price: 0.99,
//         item_name: 'Samosa'
//       }
//     ],
//     category: 'Sna',
//     category_id: 'category_y9sZKOlTAL5xTvCKRk0VfroXKrNn5m4HEeMh9Lc2VMoUyw4Lch1635-720068-0051'
//   }
// ];

export default function ViewMenu({ categories }) {
  console.log(categories);
  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: 'md', mx: 'auto' }}
      >
        <Typography variant="h3" sx={{ opacity: 0.72, textAlign: 'center' }} gutterBottom>
          Draft Categories
        </Typography>
        {/* <Button variant="contained" sx={{ fontSize: 'h5.fontSize' }}>
          Publish
        </Button> */}
      </Grid>
      {categories.length === 0
        ? [0, 1, 2, 4].map((index) => {
            return (
              <Card sx={{ p: 4, maxWidth: 'md', mx: 'auto', mt: 2 }} key={index}>
                <Skeleton variant="text" width={200} height={75} />
                <Skeleton variant="string" height={40} />
                <Skeleton variant="string" height={40} />
              </Card>
            );
          })
        : categories.map(({ category }, index) => {
            return (
              <Card sx={{ p: 4, maxWidth: 'md', mx: 'auto', mt: 2 }} key={index}>
                <Typography variant="h4" sx={{ opacity: 0.72, color: 'primary.main' }} gutterBottom>
                  Category : {category}
                </Typography>
                <CustomizedAccordions />
                <Button variant="contained" sx={{ mt: 2, fontSize: 'h6.fontSize' }}>
                  Publish
                </Button>
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

function CustomizedAccordions() {
  const [expanded, setExpanded] = useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Item 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Item 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

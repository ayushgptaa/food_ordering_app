/* eslint-disable camelcase */
import { useState, Fragment } from 'react';
// material
import { Table, TableRow, TableBody, TableCell, TableHead, Box, Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import PropTypes from 'prop-types';

ItemsTable.propTypes = {
  items: PropTypes.array,
  index: PropTypes.number,
  selectedIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

// -------------------------------------------------------------

export default function ItemsTable({ items, index, selectedIndex }) {
  const [selectedIndexoptions, setSelectedIndexoptions] = useState('');

  const handleClick = (index) => {
    if (selectedIndexoptions === index) {
      setSelectedIndexoptions('');
    } else {
      setSelectedIndexoptions(index);
    }
  };
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
        <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1, mx: 'auto' }}>
            <Table aria-label="items">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Item Name</TableCell>
                  <TableCell align="center">Item Price</TableCell>
                  <TableCell align="center">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(({ item_name, item_price, options }, index) => (
                  <Fragment key={index}>
                    <TableRow>
                      <TableCell align="center">{item_name}</TableCell>
                      <TableCell align="center">${item_price}</TableCell>
                      <TableCell align="center">
                        Options
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleClick(index)}
                        >
                          {index === selectedIndexoptions ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <OptionsTable
                      index={index}
                      options={options}
                      selectedIndexoptions={selectedIndexoptions}
                      key={index}
                    />
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

const OptionsTable = ({ options, index, selectedIndexoptions }) => {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
        <Collapse in={index === selectedIndexoptions} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1, mx: 'auto' }}>
            <Table aria-label="items">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Item Name</TableCell>
                  <TableCell align="center">Item Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {options.map(({ option_name, option_price }, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{option_name}</TableCell>
                    <TableCell align="center">{option_price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

OptionsTable.propTypes = {
  options: PropTypes.array,
  index: PropTypes.number,
  selectedIndexoptions: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

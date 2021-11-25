/* eslint-disable camelcase */
import React from 'react';
// material
import { Table, TableRow, TableBody, TableCell, TableHead, Box, Collapse } from '@mui/material';

import PropTypes from 'prop-types';

ItemsTable.propTypes = {
  items: PropTypes.array,
  index: PropTypes.number,
  selectedIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

// -------------------------------------------------------------

export default function ItemsTable({ items, index, selectedIndex }) {
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
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(({ item_name, item_price }, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{item_name}</TableCell>
                    <TableCell align="center">{item_price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

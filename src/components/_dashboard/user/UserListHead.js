import PropTypes from 'prop-types';
// material

import { TableRow, TableCell, TableHead } from '@mui/material';

// ----------------------------------------------------------------------

UserListHead.propTypes = {
  // order: PropTypes.oneOf(['asc', 'desc']),
  // orderBy: PropTypes.string,
  headLabel: PropTypes.array
};

export default function UserListHead({ headLabel }) {
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id} align="center" sx={{ color: 'primary.main' }}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

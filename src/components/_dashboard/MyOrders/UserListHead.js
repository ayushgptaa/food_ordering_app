import PropTypes from 'prop-types';
// material

import { TableRow, TableCell, TableHead } from '@mui/material';

// ----------------------------------------------------------------------

UserListHead.propTypes = {
  headLabel: PropTypes.array
};

export default function UserListHead({ headLabel }) {
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

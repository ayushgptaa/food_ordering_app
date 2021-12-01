import { TableRow, TableCell, Skeleton } from '@mui/material';

// --------------------------------------------------

export default function SkeletionRow({ TableHead }) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
    return (
      <TableRow key={index}>
        {TableHead.map((_, index) => {
          return (
            <TableCell align="center" key={index}>
              <Skeleton height={25} variant="text" key={index} />
            </TableCell>
          );
        })}
      </TableRow>
    );
  });
}

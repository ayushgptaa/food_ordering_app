/* eslint-disable camelcase */
import { useState, useEffect, Fragment } from 'react';
// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Box,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Skeleton
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// components
import Fetch from 'src/components/_dashboard/Menu/Fetch';
import ItemsTable from 'src/components/ItemsTable';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead } from '../components/_dashboard/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'orderno', label: 'Order No' },
  { id: 'Customername', label: 'Customer Name' },
  { id: 'carttotal', label: 'Cart Total' },
  { id: 'totaldiscount', label: 'Total Discount' },
  { id: 'affiliatearned', label: 'Affiliate Earned' },
  { id: 'storeearned', label: 'Store Earned' },
  { id: 'items', label: 'Items' }
];

// ----------------------------------------------------------------------

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [datecreated, setDatecreated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noOrders, setnoOrders] = useState(false);

  const handleClick = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex('');
    } else {
      setSelectedIndex(index);
    }
  };

  useEffect(() => {
    setLoading(true);
    getOrders();
  }, []);

  // ************** GET ORDERS FUNCTION ***************** //
  const getOrders = async () => {
    const data = {
      store_id:
        'store_8ncpU4CUjliKQ0l59XjQBA8DbllqxcWM8NSNUkRPGyQ5XYVHyyyI93SZ4xl5yeBh8D2P4xfO2nWwDCiZMKLHuSY9n8zA8XNgMuyf1635-612160-7001',
      date_created: datecreated
    };

    Fetch(data, 'get_orders')
      .then((res) => {
        if (res.length === 0) setnoOrders(true);
        setOrders(res);
        setLoading(false);
        const { date_created } = res[res.length - 1];
        setDatecreated(date_created);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setLoading(true);
    const data = {
      store_id:
        'store_8ncpU4CUjliKQ0l59XjQBA8DbllqxcWM8NSNUkRPGyQ5XYVHyyyI93SZ4xl5yeBh8D2P4xfO2nWwDCiZMKLHuSY9n8zA8XNgMuyf1635-612160-7001',
      date_created: datecreated
    };

    Fetch(data, 'get_orders')
      .then((res) => {
        setOrders((prevstate) => [...prevstate, ...res]);
        setLoading(false);
        const { date_created } = res[res.length - 1];
        setDatecreated(date_created);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const SkeletionRow = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
      return (
        <TableRow key={index}>
          {TABLE_HEAD.map((_, index) => {
            return (
              <TableCell align="center" key={index}>
                <Skeleton height={25} variant="text" key={index} />
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  };

  // console.log(noOr);
  return (
    <Page title="My orders">
      <Container sx={{ mt: 5 }}>
        <Box
          sx={{
            textAlign: { xs: 'center' }
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ mb: 3, opacity: 0.7 }}>
            Orders List
          </Typography>
        </Box>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} />
                {!noOrders ? (
                  <TableBody>
                    {loading ? (
                      <SkeletionRow />
                    ) : (
                      orders
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((order, index) => {
                          const {
                            customer_name,
                            cart_total,
                            total_discount,
                            customer_discount,
                            affiliate_earned,
                            affiliate_commission,
                            store_earned,
                            items
                          } = order;

                          return (
                            <Fragment key={index}>
                              <TableRow hover>
                                <TableCell align="center">
                                  <Typography variant="subtitle2" noWrap>
                                    {customer_name}
                                  </Typography>
                                </TableCell>
                                <TableCell align="center">${cart_total}</TableCell>
                                <TableCell align="center">
                                  ${total_discount}({customer_discount}%)
                                </TableCell>
                                <TableCell align="center">
                                  ${affiliate_earned}({affiliate_commission})
                                </TableCell>

                                <TableCell align="center">${store_earned}</TableCell>
                                <TableCell align="center">
                                  Items
                                  <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => handleClick(index)}
                                  >
                                    {index === selectedIndex ? (
                                      <KeyboardArrowUpIcon />
                                    ) : (
                                      <KeyboardArrowDownIcon />
                                    )}
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                              <ItemsTable
                                items={items}
                                index={index}
                                selectedIndex={selectedIndex}
                              />
                            </Fragment>
                          );
                        })
                    )}
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery="" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orders.length + 1}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

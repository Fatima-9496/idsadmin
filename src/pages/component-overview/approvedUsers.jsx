import PropTypes from 'prop-types';
// material-ui
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'tracking_no',
    align: 'left',
    disablePadding: false,
    label: 'Flow No.'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Source IP'
  },
  {
    id: 'destination_ip',
    align: 'right',
    disablePadding: false,
    label: 'Destination IP'
  },
  {
    id: 'ip_status',
    align: 'left',
    disablePadding: false,

    label: 'Status'
  },
  {
    id: 'protocol',
    align: 'right',
    disablePadding: false,
    label: 'Protocol'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Normal';
      break;
    case 2:
      color = 'error';
      title = 'Abnormal';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const order = 'asc';
  const orderBy = 'tracking_no';
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen((prev) => !prev);
  }
  function createData(tracking_no, name, destination_ip, ip_status, protocol) {
    return { tracking_no, name, destination_ip, ip_status, protocol };
  }

  const [tableRowsData, setTableRowsData] = useState([
    ['84564564', '192.35.2.1', '192.40.2.1', '2', '6'],
    ['98756325', '192.35.2.1', '192.40.2.1', '0', '4'],
    ['98652366', '192.35.2.1', '192.40.2.1', '1', '2'],
    ['13286564', '192.35.2.1', '192.40.0.1', '1', '2'],
    ['13256498', '192.35.2.1', '192.40.2.1', '2', '1'],
    ['98753263', '192.35.2.1', '192.40.2.1', '2', '5'],
    ['98753275', '192.35.2.1', '192.40.2.1', '1', '7'],
  ]);

  const [tableRows, setTableRows] = useState(
    tableRowsData.map(row => createData(...row))
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/approved_users');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTableRows(
          data.flowReport.map(row => createData(...row))
        );
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(tableRows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.tracking_no}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    <Button color="secondary" onClick={handleOpen}>
                      {' '}
                      {row.tracking_no}
                    </Button>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.destination_ip}</TableCell>
                  <TableCell>
                    <OrderStatus status={row.ip_status} />
                  </TableCell>
                  <TableCell align="right">
                    <NumericFormat value={row.protocol} displayType="text" thousandSeparator />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

OrderStatus.propTypes = { status: PropTypes.number };

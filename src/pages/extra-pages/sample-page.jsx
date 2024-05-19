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
import { useState } from 'react';
import styled from '@emotion/styled';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function createData(tracking_no, name, fat, carbs, protein) {
  return { tracking_no, name, fat, carbs, protein };
}


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
    id: 'fat',
    align: 'right',
    disablePadding: false,
    label: 'Destination IP'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,

    label: 'Status'
  },
  {
    id: 'protein',
    align: 'right',
    disablePadding: false,
    label: 'Action'
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
    case 1:
      color = 'success';
      title = 'Normal';
      break;
    case 2:
      color = 'error';
      title = 'Blacklisted';
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

  
  function addtoBlacklist(id){
    return function(){      
      setRows(rows.map(row => row.id === id ? {...row, status: 2} : row));
          // try {
    //   const response = await fetch(`/api/blacklist/${id}`, {
    //     method: 'POST',
    //   });

    //   if (response.ok) {
    //     setRows(rows.map((row) => (row.id === id ? { ...row, status: 2 } : row)));
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    }
  }
  
  const sampleItems = [
    { id: 1, source_ip: '192.35.2.1', dest_ip:'192.35.2.1', status: 1 },
    { id: 2, source_ip: '196.35.2.1', dest_ip:'192.35.2.1', status: 2 },
    { id: 3, source_ip: '192.215.2.1', dest_ip:'192.35.2.1',  status:1 },
  ];
  
  const fetchData = async () => {
    try {
      // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      // const data = await response.json();
      setRows(sampleItems.map(item => createData(item.id, '192.35.2.1', '192.40.2.1', 1)));
    } catch (error) {
      console.error(error);
    }
  };
  
  const [rows, setRows] = useState(sampleItems);

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
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.id}
                >
                  <TableCell component="th" id={labelId} scope="row">
                      {row.id}
                  </TableCell>
                  <TableCell>{row.source_ip}</TableCell>
                  <TableCell align="right">{row.dest_ip}</TableCell>
                  <TableCell>
                    <OrderStatus status={row.status} />
                  </TableCell>
                  {row.status !== 2 && (
                  <TableCell align="right">
                  <Button onClick={addtoBlacklist(row.id)} variant='contained'>Add blacklist</Button>
                  </TableCell>)}
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

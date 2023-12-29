'use client';

import { useState } from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination,
  TableRow, Button, Stack } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';

const columns = [
  { id: 'id', label: 'ID', minWidth: 60},
  { id: 'name', label: 'Name', minWidth: 150},
  {
    id: 'age', 
    label: 'Age',
    minWidth: 60,
  },
  {
    id: 'coach',
    label: 'Assigned Coach',
    minWidth: 150,
  },
  {
    id: 'payment_due',
    label: 'Payment Due',
    minWidth: 170,
  }
];

function createData(id, name, age, coach, payment_due) {
  return { id, name, age, coach, payment_due };
}

const rows = [
  createData(2, 'Ahmed Ibrahim', 23, 'Ayman', '16-09-2021'),
  createData(2, 'Ahmed Ibrahim', 23, 'Ayman', '16-09-2021'),
  createData(2, 'Ahmed Ibrahim', 23, 'Ayman', '16-09-2021'),
  createData(2, 'Ahmed Ibrahim', 23, 'Ayman', '16-09-2021'),
  createData(2, 'Ahmed Ibrahim', 23, 'Ayman', '16-09-2021'),
  createData(2, 'Ahmed Ibrahim', 23, 'Ayman', '16-09-2021'),
  createData(2, 'Ahmed Ibrahim', 23, 'Ayman', '16-09-2021'),
  createData(2, 'Ahmed Ibrahim', 23, 'Ayman', '16-09-2021'),
  createData(2, 'Ahmed Ibrahim', 23, 'Ayman', '16-09-2021'),
  createData(2, 'Ahmed Ibrahim', 23, 'Ayman', '16-09-2021'),
  createData(2, 'Ahmed Ibrahim', 23, 'Ayman', '16-09-2021'),
];

export default function TraineesTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align='center'
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
                  <TableCell
                  align='center'
                  style={{ minWidth: 250 }}>
                  Actions
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align='center'>
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell align='center'>
                      <Stack direction="row" spacing={4} justifyContent="center" >
                        <Button variant="outlined" color="error" startIcon={<Delete />}>
                          Delete
                        </Button>
                        <Button variant="outlined" startIcon={<EditIcon />}>
                          Edit
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
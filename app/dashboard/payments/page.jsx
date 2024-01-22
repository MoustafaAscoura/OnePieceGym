'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Box, Paper, LinearProgress, Table, TableBody, 
    TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import SearchBar from "@/app/ui/dashboard/trainees/searchBar"
import { setErrorStatus, setPaymentsList } from "@/app/lib/store/slices/paymentsSlice";

export async function getPayments () {
    try {
      const res = await fetch(`/api/payments`, { next: { tags: ['payments'] } })
      if (res.ok) {
        return res.json().map(payment => {
          const createdAt = new Date(payment.createdAt)
          return {...payment, createdAt:createdAt.toLocaleDateString('en-GB')}
      });
  
      } else {
        throw new Error('Something went wrong');
      }
  
    } catch {
      return false
    }
  }

const columns = [
  { id: 'id', label: 'ID', minWidth: 60},
  { id: 'trainee', label: 'Name', minWidth: 150},
  { id: 'amount', label: 'Amount', minWidth: 60},
  { id: 'createdAt', label: 'Date', minWidth: 150}
];

export default function Payments () {
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filteredData, setFilteredData] = useState(false);
    const {paymentsList, status} = useSelector(state => state.paymentsList)

    const dispatch = useDispatch()

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(()=>{
        if (paymentsList) {
            setFilteredData(paymentsList.filter(payment => {
                return ((payment.trainee?.fname || "")+(payment.trainee?.mname || "")+(payment.trainee?.lname || "")).toLowerCase().includes(query.toLowerCase())
            }))
        }
    },[query, paymentsList])

    function fetchPayments () {
        const payments = getPayments()
        if (payments) {
            dispatch(setPaymentsList(payments))
        } else {
            dispatch(setErrorStatus())
        }
    }
    
    useEffect(() => {
        if (status == 0) {
            fetchPayments()
        }
    }, [])

    return (
        <Box className="bg-green-100">
            <SearchBar query={query} setQuery={setQuery} createNew={false}/>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {status == 1? filteredData.length? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment, index) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            {columns.map((column) => {
                                const value = payment[column.id] || "No Data";
                                return (
                                <TableCell key={column.id} align='center'>
                                    {column.id === "trainee"? (value.fname || "Unknown") + ' ' + (value.mname || '') + ' ' + (value.lname || 'Unknown'):value}
                                </TableCell>
                                );
                            })}
                            </TableRow>
                        );
                        }): <TableRow ><TableCell colSpan={8}><MuiAlert elevation={6} variant="filled" severity="info">No Data Found</MuiAlert></TableCell></TableRow>
                        :status == 0 ? <TableRow ><TableCell colSpan={8}><LinearProgress/></TableCell></TableRow>
                        :<TableRow ><TableCell colSpan={8}><MuiAlert elevation={6} variant="filled" severity="error">An Error Happened!</MuiAlert></TableCell></TableRow>}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    component="div"
                    count={paymentsList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton={true}
                    showLastButton={true}
                />
            </Paper>
        </Box>
    );
}
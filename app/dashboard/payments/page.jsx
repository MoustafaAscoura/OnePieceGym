'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Box, Paper, LinearProgress, Table, TableBody, Button,
    TableCell, TableContainer, TableHead, TablePagination, TableRow,
    TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import SearchBar from "@/app/ui/dashboard/trainees/searchBar"
import DeleteIcon from '@mui/icons-material/Delete';
import { removePayment, setErrorStatus, setPaymentsList, addToPaymentsList } from "@/app/lib/store/slices/paymentsSlice";
import ExpensesDialog from "@/app/ui/dashboard/trainees/expensesDialog";

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
    const [filteredData, setFilteredData] = useState([]);
    const {paymentsList, status} = useSelector(state => state.paymentsList)
    const [openDelete, setOpenDelete] = useState(false);
    const [expenseOpen, setExpenseOpen] = useState(false)

    const handleClickOpen = (id) => setOpenDelete(id)
    const handleClose = () => setOpenDelete(false)
    const handleChangePage = (event, newPage) => setPage(newPage)
    const dispatch = useDispatch()
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const fetchPayments = () => {
        fetch(`/api/payments`, { next: { tags: ['payments'] } })
        .then((response)=>{
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((responseJson) => {
            dispatch(setPaymentsList(responseJson.map(payment => {
                const createdAt = new Date(payment.createdAt)
                return {...payment, createdAt:createdAt.toLocaleDateString('en-GB')}
            })))
        }).catch((e)=>{
            dispatch(setErrorStatus())
        })
    }

        
    const deletePayment = (id) =>{
        fetch(`/api/payments?id=${id}`, {method:"DELETE"})
        .then((response)=>{
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then(() => dispatch(removePayment(id)))
        .catch((e)=> console.log(e))
    }


    const addExpense = (formData) => {

        fetch("/api/payments", {
            method: "POST",
            body: formData,
        }).then(response => response.json())
            .then(jsonResponse => {
                const createdAt = new Date()
            dispatch(addToPaymentsList({...jsonResponse, 
                createdAt:createdAt.toLocaleDateString('en-GB'),
            }))
            setExpenseOpen(false);
            })
            .catch((err) => {
            console.log(err)});
    }

    useEffect(()=>{
        if (status > 1) {
            setFilteredData(paymentsList.filter(payment => {
                return ((payment.trainee?.fname || "")+(payment.trainee?.mname || "")+(payment.trainee?.lname || "")).toLowerCase().includes(query.toLowerCase())
            }))
        } else {
            fetchPayments()
        }
    },[query, paymentsList])



    return (
        <Box className="bg-green-100">
            <SearchBar query={query} setQuery={setQuery} createNew={() => setExpenseOpen(true)}/>
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
                            <TableCell align='center' style={{ minWidth: 20 }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {status === 3? filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment, index) => {
                        return (
                            <TableRow hover role="checkbox" className={payment.expense ? 'bg-red-100' : ''} tabIndex={-1} key={index}>
                            {columns.map((column) => {
                                const value = payment[column.id] || "No Data";
                                return (
                                <TableCell key={column.id} align='center'>
                                    {column.id === "trainee"? payment.expense ? payment.note : (value.fname || "Unknown") + ' ' + (value.mname || '') + ' ' + (value.lname || 'Unknown'):value}
                                </TableCell>
                                );
                            })}
                            <TableCell align='center'> <DeleteIcon color="error" onClick={() => handleClickOpen(payment.id)}/> </TableCell>
                            </TableRow>
                        );
                        }): status === 2 ? <TableRow ><TableCell colSpan={9}><MuiAlert elevation={6} variant="filled" severity="info">No Data Found</MuiAlert></TableCell></TableRow>
                        :status === -1 ? <TableRow ><TableCell colSpan={9}><MuiAlert elevation={6} variant="filled" severity="error">An Error Happened!</MuiAlert></TableCell></TableRow>
                        :<TableRow ><TableCell colSpan={9}><LinearProgress/></TableCell></TableRow>}
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
            <ExpensesDialog open={expenseOpen} setOpen={setExpenseOpen} addExpense={addExpense}/>

            <Dialog
                open={openDelete}
                onClose={handleClose}
                PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const pass = formJson.password;
                    if (pass == process.env.ADMIN_PASSWORD) {
                        deletePayment(openDelete)
                    }
                    handleClose();
                },
                }}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Enter Admin Password To Continue.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" color="error">Delete</Button>
                </DialogActions>
            </Dialog>
            
        </Box>
    );
}







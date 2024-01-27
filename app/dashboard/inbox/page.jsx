'use client'
import { useEffect, useState } from "react";
import {Box, Paper, LinearProgress, Table, TableBody, 
    TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import SearchBar from "@/app/ui/dashboard/trainees/searchBar"
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { setMessagesList, setErrorStatus, setSeenMessage, removeMessage } from "@/app/lib/store/slices/messagesSlice";

const columns = [
  { id: 'id', label: 'ID', minWidth: 20},
  { id: 'name', label: 'Name', minWidth: 100},
  { id: 'phone', label: 'Phone', minWidth: 70},
  { id: 'message', label: 'Message', minWidth: 100, },
  { id: 'createdAt', label: 'Date', minWidth: 100, },
];

export default function Inbox () {
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filteredData, setFilteredData] = useState([]);
    const dispatch = useDispatch()
    const {status, messagesList} = useSelector(state => state.messagesList)
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const seeMessage = (id) =>{
        fetch(`/api/messages?id=${id}`, {method:"PATCH"})
        .then((response)=>{
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((responseJson) => {
            dispatch(setSeenMessage(id))
        }).catch((e)=>{
            dispatch(setErrorStatus())
        })
    }

    const deleteMessage = (id) =>{
        fetch(`/api/messages?id=${id}`, {method:"DELETE"})
        .then((response)=>{
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then(() => dispatch(removeMessage(id)))
        .catch((e)=> console.log(e))
    }

    useEffect(()=>{
        if (status > 1) {
            setFilteredData(messagesList.filter(message => {
                return (message.name + message.message).toLowerCase().includes(query.toLowerCase())
            }))
        } else {
            fetch(`/api/messages`, { next: { tags: ['messages'] } })
            .then((response)=>{
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((responseJson) => {
                dispatch(setMessagesList(responseJson.map(message => {
                    const createdAt = new Date(message.createdAt)
                    return {...message, createdAt:createdAt.toUTCString()}
                })))
            }).catch((e)=>{
                dispatch(setErrorStatus())
            })
        } 

    },[query, messagesList])


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
                            <TableCell align='center' style={{ minWidth: 20 }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {status === 3? filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((message, index) => {
                        return (
                            <TableRow className={message.read?"":"bg-gray-300"} onClick={() => {if (!message.read){seeMessage(message.id)}}} hover role="checkbox" tabIndex={-1} key={index}>
                            {columns.map((column) => {
                                const value = message[column.id];
                                return (
                                <TableCell key={column.id} align='center'>
                                    {value}
                                </TableCell>
                                );
                            })}
                            <TableCell align='center'> <DeleteIcon color="error" onClick={() => {deleteMessage(message.id)}}/> </TableCell>
                            </TableRow>

                        );
                        }): status == 2 ?<TableRow ><TableCell colSpan={8}><MuiAlert elevation={6} variant="filled" severity="info">No Data Found</MuiAlert></TableCell></TableRow>
                        :status == -1 ? <TableRow ><TableCell colSpan={8}><MuiAlert elevation={6} variant="filled" severity="error">An Error Happened!</MuiAlert></TableCell></TableRow>
                        :<TableRow ><TableCell colSpan={8}><LinearProgress/></TableCell></TableRow>}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    component="div"
                    count={messagesList.length}
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
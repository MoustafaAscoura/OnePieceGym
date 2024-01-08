'use client'
import { useEffect, useState } from "react";
import {Box, Paper, LinearProgress, Table, TableBody, 
    TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import SearchBar from "@/app/ui/dashboard/trainees/searchBar"

const columns = [
  { id: 'id', label: 'ID', minWidth: 60},
  { id: 'name', label: 'Name', minWidth: 150},
  { id: 'email', label: 'Email', minWidth: 100},
  { id: 'phone', label: 'Phone', minWidth: 100},
  {
    id: 'message', 
    label: 'Message',
    minWidth: 100,
  },
  {
    id: 'createdAt',
    label: 'Date',
    minWidth: 150,
  },
];

export default function Inbox () {
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState(0);
    const [query, setQuery] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [messagesData, setMessagesData] = useState(false);
    const [filteredData, setFilteredData] = useState(false);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const seeMessage = (id, index) =>{
        fetch(`/api/messages?id=${id}`, {method:"PATCH"})
        .then((response)=>{
            if (response.ok) {
                setStatus(1)
                return response.json();
            }
            setStatus(-1)
            throw new Error('Something went wrong');
        })
        .then((responseJson) => {
            console.log(responseJson)
            const messages_ = [...messagesData]
            messages_[index] = {...messages_[index], read: true}
            setMessagesData(messages_)
        }).catch((e)=>{
            setStatus(-1)
            console.log(e)
        })
    }
    useEffect(()=>{
        if (messagesData) {
            setFilteredData(messagesData.filter(message => {
                return (message.name + message.message).toLowerCase().includes(query.toLowerCase())
            }))
        } else {
            fetch(`/api/messages`, { next: { tags: ['messages'] } })
            .then((response)=>{
                if (response.ok) {
                    setStatus(1)
                    return response.json();
                }
                setStatus(-1)
                throw new Error('Something went wrong');
            })
            .then((responseJson) => {
                setMessagesData(responseJson.map(message => {
                    const createdAt = new Date(message.createdAt)
                    return {...message, createdAt:createdAt.toUTCString()}
                }))
            }).catch((e)=>{
                setStatus(-1)
                console.log(e)
            })
        } 

    },[query, messagesData])


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
                    {status == 1? filteredData.length? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((message, index) => {
                        return (
                            <TableRow className={message.read?"":"bg-gray-300"} onClick={e => {if (!message.read){seeMessage(message.id, index)}}} hover role="checkbox" tabIndex={-1} key={index}>
                            {columns.map((column) => {
                                const value = message[column.id];
                                return (
                                <TableCell key={column.id} align='center'>
                                    {value}
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
                    count={messagesData.length}
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
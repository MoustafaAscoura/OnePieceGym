'use client'
import { useEffect, useState } from "react";
import {Box, Paper, LinearProgress, Table, TableBody, 
    TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import SearchBar from "@/app/ui/dashboard/trainees/searchBar"

const columns = [
  { id: 'id', label: 'ID', minWidth: 60},
  { id: 'trainee', label: 'Trainee', minWidth: 150},
  { id: 'coach', label: 'Coach', minWidth: 150},
  {
    id: 'description', 
    label: 'Description',
    minWidth: 100,
  },
  {
    id: 'duration', 
    label: 'Duration',
    minWidth: 40,
  },
  {
    id: 'rating', 
    label: 'Rating',
    minWidth: 40,
  },
  {
    id: 'createdAt',
    label: 'Date',
    minWidth: 150,
  },
];

export default function Sessions () {
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState(0);
    const [query, setQuery] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sessionsData, setSessionsData] = useState(false);
    const [filteredData, setFilteredData] = useState(false);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(()=>{
        if (sessionsData) {
            setFilteredData(sessionsData.filter(session => {
                return ((session.trainee?.fname || "")+(session.trainee?.mname || "")+(session.trainee?.lname || "")).toLowerCase().includes(query.toLowerCase())
            }))
        } else {
            fetch(`/api/sessions`, { next: { tags: ['sessions'] } })
            .then((response)=>{
                if (response.ok) {
                    setStatus(1)
                    return response.json();
                }
                setStatus(-1)
                throw new Error('Something went wrong');
            })
            .then((responseJson) => {
                setSessionsData(responseJson.map(session => {
                    const createdAt = new Date(session.createdAt)
                    return {...session, createdAt:createdAt.toUTCString()}
                }))
            }).catch((e)=>{
                setStatus(-1)
                console.log(e)
            })
        } 

    },[query, sessionsData])


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
                                    {["trainee","coach"].includes(column.id)? (value.fname || "Unknown") + ' ' + (value.mname || '') + ' ' + (value.lname || 'Unknown'):value}
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
                    count={sessionsData.length}
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
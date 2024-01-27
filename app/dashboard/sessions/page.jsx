'use client'
import { useEffect, useState } from "react";
import {Box, Paper, LinearProgress, Table, TableBody, 
    TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import SearchBar from "@/app/ui/dashboard/trainees/searchBar"
import { useDispatch, useSelector } from "react-redux";
import { setSessionsCount, setSessionsList, setErrorStatus, removeSession } from "@/app/lib/store/slices/sessionsSlice";
import SessionDialog from "@/app/ui/dashboard/trainees/sessionDialog";
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'id', label: 'ID', minWidth: 60},
  { id: 'trainee', label: 'Trainee', minWidth: 150},
  { id: 'coach', label: 'Coach', minWidth: 150},
  { id: 'description', label: 'Description', minWidth: 100},
  { id: 'rating', label: 'Rating', minWidth: 40},
  { id: 'duration', label: 'Duration', minWidth: 40},
  { id: 'startHour', label: 'Hour', minWidth: 150},
  { id: 'startDay', label: 'Date', minWidth: 150},
];

export default function Sessions () {
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState("");
    const [detailSession, setDetailSession] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filteredData, setFilteredData] = useState([]);
    const dispatch = useDispatch()
    const {count, sessionsList, status} = useSelector(state => state.sessionsList)

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const fetchSessions = () => {
        fetch(`/api/sessions`, { next: { tags: ['sessions'] } })
        .then((response)=>{
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((responseJson) => {
            dispatch(setSessionsList(responseJson.map(session => {
                const createdAt = new Date(session.createdAt)
                return {...session, startHour:createdAt.toLocaleTimeString(), startDay:createdAt.toLocaleDateString('en-GB')}
            })))
        }).catch((e)=>{
            dispatch(setErrorStatus())
        })
    }
    
    const deleteSession = (id) =>{
        fetch(`/api/sessions?id=${id}`, {method:"DELETE"})
        .then((response)=>{
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then(() => dispatch(removeSession(id)))
        .catch((e)=> console.log(e))
    }

    useEffect(()=>{
        if (sessionsList.length) {
            setFilteredData(sessionsList.filter(session => {
                return (session.description + (session.trainee?.fname || "")+(session.trainee?.mname || "")+(session.trainee?.lname || "")).toLowerCase().includes(query.toLowerCase())
            }))
        } else {
            if (status <= 1){
                fetchSessions()
            }
        } 

    },[query, sessionsList])

    function countSessions () {
        fetch(`/api/sessions/latest`)
        .then((response)=>{
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((responseJson) => {
            dispatch(setSessionsCount(responseJson._count))
        }).catch((e)=>{
          console.log(e)
        })
     }
        
    useEffect(() => {
    if (status < 1){
        countSessions()
    }
    }, [])


    return (
        <Box className="bg-green-100">
            <SearchBar query={query} setQuery={setQuery}/>
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
                    {status == 3? filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((session, index) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                            {columns.map((column) => {
                                const value = session[column.id] || "No Data";
                                return (
                                <TableCell key={column.id} align='center' onClick={() => setDetailSession(session)}>
                                    {["trainee","coach"].includes(column.id)? (value.fname || "Unknown") + ' ' + (value.mname || '') + ' ' + (value.lname || 'Unknown'):value}
                                </TableCell>
                                );
                            })}
                            <TableCell align='center'> <DeleteIcon color="error" onClick={(e) => {e.preventDefault(); deleteSession(session.id)}}/> </TableCell>
                            </TableRow>
                        );
                        })
                        : status == 2 ? <TableRow ><TableCell colSpan={9}><MuiAlert elevation={6} variant="filled" severity="info">No Data Found</MuiAlert></TableCell></TableRow>
                        :status === -1 ? <TableRow ><TableCell colSpan={9}><MuiAlert elevation={6} variant="filled" severity="error">An Error Happened!</MuiAlert></TableCell></TableRow>
                        :<TableRow ><TableCell colSpan={9}><LinearProgress/></TableCell></TableRow>}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton={true}
                    showLastButton={true}
                />
            </Paper>
            <SessionDialog open={detailSession} setOpen={setDetailSession}/>
        </Box>
    );
}
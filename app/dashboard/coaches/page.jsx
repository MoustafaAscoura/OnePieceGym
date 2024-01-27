'use client'
import { useEffect, useState } from "react";
import {Box, Paper, LinearProgress, Table, TableBody, 
    TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import SearchBar from "@/app/ui/dashboard/trainees/searchBar"
import CoachDetails from "@/app/ui/dashboard/coaches/details";
import {serialize_coach} from "@/app/lib/utils/functions";
import { useSelector, useDispatch} from "react-redux";
import { setCoachesList, setErrorStatus } from "@/app/lib/store/slices/coachesSlice";

const columns = [
  { id: 'id', label: 'ID', minWidth: 30},
  { id: 'name', label: 'Name', minWidth: 100},
  { id: 'age', label: 'Age', minWidth: 30, },
  { id: 'sessions_count', label: 'Sessions', minWidth:50},
  { id: 'trainees_count', label: 'Trainees', minWidth:50}
];

export default function Coaches () {
    const {count, status, coachesList} = useSelector(state => state.coachesList)

    const [page, setPage] = useState(0);
    const [query, setQuery] = useState("");
    const [detailCoach, setDetailCoach] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filteredData, setFilteredData] = useState([]);
    const dispatch = useDispatch()

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    function fetchCoaches () {
        fetch(`/api/coaches`)
        .then((response)=>{
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((responseJson) => {
            dispatch(setCoachesList(responseJson.map(coach => serialize_coach(coach))))
        }).catch((e)=>{
            console.log(e)
            dispatch(setErrorStatus())
        })
    }

    useEffect(()=>{
        if (status > 1) {
            setFilteredData(coachesList.filter(coach => {
                return coach.name.toLowerCase().includes(query.toLowerCase())
            }))
        } else {
            fetchCoaches()
        }

    },[query, coachesList])

    return (
        <Box className="bg-green-100">
            <SearchBar query={query} setQuery={setQuery} createNew={()=>setDetailCoach({})}/>
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
                    {status == 3? filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((coach, index) => {
                        return (
                            <TableRow hover role="checkbox" onClick={e=>setDetailCoach(coach)} tabIndex={-1} key={index}>
                            {columns.map((column) => {
                                const value = coach[column.id];
                                return (
                                <TableCell key={column.id} align='center'>
                                    {value}
                                </TableCell>    
                                );
                            })}
                            </TableRow>
                        );
                        }): status == 2?<TableRow ><TableCell colSpan={8}><MuiAlert elevation={6} variant="filled" severity="info">No Data Found</MuiAlert></TableCell></TableRow>
                        :status == -1 ? <TableRow ><TableCell colSpan={8}><MuiAlert elevation={6} variant="filled" severity="error">An Error Happened!</MuiAlert></TableCell></TableRow>
                        :<TableRow ><TableCell colSpan={8}><LinearProgress/></TableCell></TableRow>}
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
            <CoachDetails detailCoach={detailCoach} setDetailCoach={setDetailCoach} serialize_coach={serialize_coach}/>
        </Box>
    );
}
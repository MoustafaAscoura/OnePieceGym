'use client'
import { useEffect, useState } from "react";
import {Box, Paper, Chip, LinearProgress, Table, TableBody, 
    TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import SearchBar from "@/app/ui/dashboard/trainees/searchBar"
import CoachDetails from "@/app/ui/dashboard/coaches/details";
import {serialize_coach} from "@/app/lib/utils/functions";

const columns = [
  { id: 'id', label: 'ID', minWidth: 60},
  { id: 'name', label: 'Name', minWidth: 150},
  {
    id: 'age', 
    label: 'Age',
    minWidth: 60,
  },
  {
    id: 'sessions_count',
    label: 'Sessions',
    minWidth:100
  },
  {
    id: 'trainees_count',
    label: 'Trainees',
    minWidth:100
  }
];

export default function Coaches () {
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState(0);
    const [query, setQuery] = useState("");
    const [detailCoach, setDetailCoach] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [coachesData, setCoachesData] = useState(false);
    const [filteredData, setFilteredData] = useState(false);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(()=>{
        if (coachesData) {
            setFilteredData(coachesData.filter(coach => {
                return coach.name.toLowerCase().includes(query.toLowerCase())
            }))
        } else {
            fetch(`/api/coaches`, { next: { tags: ['coaches'] } })
            .then((response)=>{
                if (response.ok) {
                    setStatus(1)
                    return response.json();
                }
                setStatus(-1)
                throw new Error('Something went wrong');
            })
            .then((responseJson) => {
                setCoachesData(responseJson.map(coach => {
                    return serialize_coach(coach)
                }))
            }).catch((e)=>{
                setStatus(-1)
                console.log(e)
            })
        } 

    },[query, coachesData])

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
                    {status == 1? filteredData.length? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((coach, index) => {
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
                        }): <TableRow ><TableCell colSpan={8}><MuiAlert elevation={6} variant="filled" severity="info">No Data Found</MuiAlert></TableCell></TableRow>
                        :status == 0 ? <TableRow ><TableCell colSpan={8}><LinearProgress/></TableCell></TableRow>
                        :<TableRow ><TableCell colSpan={8}><MuiAlert elevation={6} variant="filled" severity="error">An Error Happened!</MuiAlert></TableCell></TableRow>}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    component="div"
                    count={coachesData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton={true}
                    showLastButton={true}
                />
            </Paper>
            <CoachDetails detailCoach={detailCoach} setDetailCoach={setDetailCoach} serialize_coach={serialize_coach} coachesData={coachesData} setCoachesData={setCoachesData}/>
        </Box>
    );
}
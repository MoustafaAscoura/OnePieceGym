'use client'
import { useEffect, useState } from "react";
import {Box, Paper, LinearProgress, Table, TableBody, 
    TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import SearchBar from "@/app/ui/dashboard/trainees/searchBar"
import ProgramDetails from "@/app/ui/dashboard/programs/details";
import { useSelector, useDispatch} from "react-redux";
import { setProgramsList, setErrorStatus } from "@/app/lib/store/slices/programsSlice";

const columns = [
  { id: 'id', label: 'ID', minWidth: 10},
  { id: 'name', label: 'Name', minWidth: 70},
  { id: 'cost', label: 'Cost', minWidth: 20},
  { id: 'duration', label: 'Duration', minWidth: 20},
  { id: 'period', label: 'Period', minWidth: 40},
  { id: 'trainees_count', label: 'Trainees', minWidth:30},
  { id: 'show', label: 'Show on Website', minWidth:40},
  { id: 'basic', label: 'Program Type', minWidth:40},
];

export default function Programs () {
    const {count, status, programsList} = useSelector(state => state.programsList)

    const [page, setPage] = useState(0);
    const [query, setQuery] = useState("");
    const [detailProgram, setDetailProgram] = useState(false)
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

    
    function fetchPrograms () {
        fetch(`/api/programs`)
        .then((response)=>{
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((responseJson) => {
            console.log("Programs", responseJson)
            dispatch(setProgramsList(responseJson.map(program => {
                program.trainees_count = program._count.trainees || 0
                return program
            })))
        }).catch((e)=>{
            console.log(e)
            dispatch(setErrorStatus())
        })
    }

    useEffect(()=>{
        if (status > 1) {
            setFilteredData(programsList.filter(program => {
                return (program.name + program.description).toLowerCase().includes(query.toLowerCase())
            }))
        } else {
            fetchPrograms()
        }

    },[query, programsList])

    return (
        <Box className="bg-green-100">
            <SearchBar query={query} setQuery={setQuery} createNew={()=>setDetailProgram({})}/>
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
                    {status == 3? filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((program, index) => {
                        return (
                            <TableRow hover role="checkbox" onClick={e=>setDetailProgram(program)} tabIndex={-1} key={index}>
                            {columns.map((column) => {
                                const value = program[column.id];
                                return (
                                <TableCell key={column.id} align='center'>
                                    {column.id === "show"? value? "Shown" : "Hidden" 
                                    : column.id === "basic" ? value ? "Basic Program" : "Special Program" : value}
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
            <ProgramDetails detailProgram={detailProgram} setDetailProgram={setDetailProgram}/>
        </Box>
    );
}
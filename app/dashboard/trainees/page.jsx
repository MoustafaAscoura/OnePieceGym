'use client'
import { useEffect, useState } from "react";
import {Box, Paper, Chip, LinearProgress, Table, TableBody, 
    TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import SearchBar from "@/app/ui/dashboard/trainees/searchBar"
import TraineeDetails from "@/app/ui/dashboard/trainees/details";
import { useSelector, useDispatch } from "react-redux";
import { setErrorStatus, setTraineesList } from "../../lib/store/slices/traineesSlice";
import { serialize_trainee } from "@/app/lib/utils/functions";

export async function getTrainees () {
    try {
      const res = await fetch(`/api/trainees`, { next: { tags: ['trainees'] } })
      if (res.ok) {
        return res.json().map(trainee => {
          return serialize_trainee(trainee)
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
  { id: 'name', label: 'Name', minWidth: 150},
  { id: 'age', label: 'Age', minWidth: 60},
  { id: 'coach_name', label: 'Assigned Coach', minWidth: 150},
  { id: 'payment_due', label: 'Payment Remaining', minWidth: 170},
  { id: 'sessions_count', label: 'Sessions', minWidth:100},
  { id:'membership_expiry', label: 'Membership Expiry', minWidth:100},
  { id:'status', label: 'Membership Status', minWidth:100}
];

export default function Trainees () {
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState("");
    const [detailTrainee, setDetailTrainee] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filteredData, setFilteredData] = useState(false);
    const {traineesList, status} = useSelector(state => state.traineesList)
    const dispatch = useDispatch()

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(()=>{
        if (traineesList) {
            setFilteredData(traineesList.filter(trainee => {
                return (trainee.fname+trainee.mname+trainee.lname).toLowerCase().includes(query.toLowerCase())
            }))
        }
    },[query, traineesList])
  
    function fetchTrainees () {
      const trainees = getTrainees()
      if (trainees) {
        dispatch(setTraineesList(trainees))
      } else {
        dispatch(setErrorStatus())
      }
    }
  
    useEffect(() => {
      if (status == 0) {
        fetchTrainees()
      }
    }, [])

    return (
        <Box className="bg-green-100">
            <SearchBar query={query} setQuery={setQuery} createNew={()=>setDetailTrainee({})}/>
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
                    {status == 1? filteredData.length? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((trainee, index) => {
                        return (
                            <TableRow hover role="checkbox" onClick={e=>setDetailTrainee(trainee)} tabIndex={-1} key={index}>
                            {columns.map((column) => {
                                const value = trainee[column.id];
                                return (
                                <TableCell key={column.id} align='center'>
                                    {column.id === "status"?<Chip color={trainee.status == "Valid Membership"?"success":trainee.status == "Payment Due"?"warning":"error"} size="small" label={trainee.status}/>:value}
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
                    count={traineesList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton={true}
                    showLastButton={true}
                />
            </Paper>
            <TraineeDetails detailTrainee={detailTrainee} setDetailTrainee={setDetailTrainee}/>
        </Box>
    );
}
'use client'
import { useEffect, useState } from "react";
import {Box, Paper, Chip, LinearProgress, Table, TableBody, 
    TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import SearchBar from "@/app/ui/dashboard/trainees/searchBar"
import Link from "next/link";
import TraineeDetails from "@/app/ui/dashboard/trainees/details";

const columns = [
  { id: 'id', label: 'ID', minWidth: 60},
  { id: 'name', label: 'Name', minWidth: 150},
  {
    id: 'age', 
    label: 'Age',
    minWidth: 60,
  },
  {
    id: 'coach_name',
    label: 'Assigned Coach',
    minWidth: 150,
  },
  {
    id: 'payment_due',
    label: 'Payment Remaining',
    minWidth: 170,
  },
  {
    id: 'sessions_count',
    label: 'Sessions',
    minWidth:100
  },{
    id:'membership_expiry',
    label: 'Membership Expiry',
    minWidth:100
  },{
    id:'status',
    label: 'Membership Status',
    minWidth:100
  }
];

const calculate_age = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const calculate_due_date = (start, program) => {
    let period = program.period
    let duration = program.duration
    let end_date = new Date(start)

    switch (period) {
        case ('year'):
            end_date.setFullYear(end_date.getFullYear() + duration)
            break;
        case ('month'):
            end_date.setMonth(end_date.getMonth() + duration)
            break;
        case ('week'):
            end_date.setDate(end_date.getDate() + duration*7)
            break;
        case ('day'):
            end_date.setDate(end_date.getDate() + duration)
            break;
    }


    return end_date.toLocaleDateString('en-GB')
}

const calculate_sessions_month = (sessions) => {
    let today = new Date()
    let curr_month = today.getMonth()
    return sessions.filter(session => {
        let session_date = new Date(session.createdAt)
        return session_date.getMonth() == curr_month
    }).length
}

const chech_status = (trainee) => {
    let end_date = new Date(trainee.membership_expiry)

    return end_date < new Date()? "Membership Expired"
    :parseInt(trainee.payment_total) < parseInt(trainee.program.cost)? "Payment is Due"
    :"Valid Membership"
}

const calculate_due_payment = (payments, start) => {
    const sub_start = new Date(start)
    const sub_payments = payments.filter(pay => {
        let pay_date = new Date(pay.createdAt)
        return pay_date >= sub_start
    })

    return sub_payments.reduce((acc, curr) => acc + parseInt(curr.amount), 0);
}

const serialize_trainee = (trainee) => {
    trainee.createdAt = new Date(trainee.createdAt)
    trainee.name = trainee.fname + (` ${trainee.mname} ` || ' ') + trainee.lname;
    trainee.age = trainee.birthdate ? calculate_age(trainee.birthdate): '';
    trainee.coach_name = trainee.coach? trainee.coach.fname + ' ' + trainee.coach.lname: '';
    trainee.membership_expiry = calculate_due_date(trainee.subscription_start, trainee.program);
    trainee.sessions_count = trainee.sessions.length + ` (${calculate_sessions_month(trainee.sessions)} this month)`
    trainee.payment_total = calculate_due_payment(trainee.payments, trainee.subscription_start);
    trainee.payment_due = `${trainee.payment_total} / ${trainee.program.cost}`
    trainee.status = chech_status(trainee);
    return trainee
}


export default function Trainees () {
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState(0);
    const [query, setQuery] = useState("");
    const [detailTrainee, setDetailTrainee] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [traineesData, setTraineesData] = useState(false);
    const [filteredData, setFilteredData] = useState(false);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(()=>{
        if (traineesData) {
            setFilteredData(traineesData.filter(trainee => {
                return (trainee.fname+trainee.mname+trainee.lname).toLowerCase().includes(query.toLowerCase())
            }))
        } else {
            fetch(`/api/trainees`, { next: { tags: ['trainees'] } })
            .then((response)=>{
                if (response.ok) {
                    setStatus(1)
                    return response.json();
                }
                setStatus(-1)
                throw new Error('Something went wrong');
            })
            .then((responseJson) => {
                setTraineesData(responseJson.map(trainee => {
                    return serialize_trainee(trainee)
                }))
            }).catch((e)=>{
                setStatus(-1)
                console.log(e)
            })
        } 

    },[query, traineesData])

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
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {status == 1? filteredData.length? filteredData.map((trainee, index) => {
                        return (
                            <TableRow hover role="checkbox" onClick={e=>setDetailTrainee(trainee)} tabIndex={-1} key={index}>
                            {columns.map((column) => {
                                const value = trainee[column.id];
                                return (
                                <TableCell key={column.id} align='center'>
                                    {column.id === "status"?<Chip color={trainee.status == "Valid Membership"?"success":"warning"} size="small" label={trainee.status}/>:value}
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
                    count={traineesData.length}
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
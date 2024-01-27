'use client'

import Grid from '@mui/material/Grid';
import BasicCard from '@/app/ui/dashboard/card'
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { setTraineesCount } from "../lib/store/slices/traineesSlice";
import { setPaymentsSum } from '../lib/store/slices/paymentsSlice';
import { setSessionsCount } from '../lib/store/slices/sessionsSlice';
import { setCoachesList, setErrorStatus as setCoachesError } from '../lib/store/slices/coachesSlice';
import { setProgramsList, setErrorStatus as setProgramsError } from '../lib/store/slices/programsSlice';
import { setMessagesCount } from '../lib/store/slices/messagesSlice';
import { serialize_coach } from '../lib/utils/functions';

export default function Dashboard() {
  const dispatch = useDispatch()
  const {count: traineesCount, status: traineesStatus} = useSelector(state => state.traineesList)
  const {count: coachesCount, status: coachesStatus} = useSelector(state => state.coachesList)
  const {count: sessionsCount, status: sessionsStatus} = useSelector(state => state.sessionsList)
  const {count: programsCount, status: programsStatus} = useSelector(state => state.programsList)
  const {unread: messagesCount, status: messagesStatus} = useSelector(state => state.messagesList)
  const {sum : paymentsSum, status: paymentsStatus} = useSelector(state => state.paymentsList)

  function countTrainees () {
    fetch(`/api/trainees/count`)
    .then((response)=>{
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then((responseJson) => {
        dispatch(setTraineesCount(responseJson))
    }).catch((e)=>{
      console.log(e)
    })
  }

  function fetchCoaches () {
    fetch(`/api/coaches`)
    .then((response)=>{
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then((responseJson) => {
      console.log("Coaches", responseJson)
        dispatch(setCoachesList(responseJson.map(coach => serialize_coach(coach))))
    }).catch((e)=>{
      console.log(e)
      dispatch(setCoachesError())
    })
  }

  function fetchPrograms () {
    fetch(`/api/programs`)
    .then((response)=>{
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then((responseJson) => {
        dispatch(setProgramsList(responseJson))
    }).catch((e)=>{
      console.log(e)
      dispatch(setProgramsError())

    })
  }

  function countMessages () {
    fetch(`/api/messages/unread`)
    .then((response)=>{
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then((responseJson) => {
        dispatch(setMessagesCount(responseJson._count))
    }).catch((e)=>{
      console.log(e)
    })
  }

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

  function calcPayments () {
    fetch(`/api/payments/latest`)
    .then((response)=>{
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then((responseJson) => {
        dispatch(setPaymentsSum(responseJson._sum.amount))
    }).catch((e)=>{
      console.log(e)
    })
  }


  useEffect(() => {
    if (traineesStatus < 1){
      countTrainees()
    }
    if (coachesStatus < 1){
      fetchCoaches()
    }
    if (paymentsStatus < 1){
      calcPayments()
    }
    if (sessionsStatus < 1){
      countSessions()
    }
    if (programsStatus < 1){
      fetchPrograms()
    }
    if (messagesStatus < 1){
      countMessages()
    }
  }, [])


  return (<>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs>
            <BasicCard title={'Trainees'} 
            description={'Currently Enrolled'} number={traineesCount}/>
        </Grid>
        <Grid item xs>
            <BasicCard title={'Payments'} 
            description={'In the last 30 days'} number={paymentsSum}/>
        </Grid>
        <Grid item xs>
            <BasicCard title={'Sessions'} 
            description={'In the last 30 days'} number={sessionsCount}/>
        </Grid>
        <Grid item xs>
            <BasicCard title={'Coaches'} 
            description={'Registered Coaches'} number={coachesCount}/>
        </Grid>
        <Grid item xs>
            <BasicCard title={'Programs'} 
            description={'Offered Programs'} number={programsCount}/>
        </Grid>
        <Grid item xs>
            <BasicCard title={'Inbox'} 
            description={'Unread Messages'} number={messagesCount}/>
        </Grid>
      </Grid>

</>
  );
}
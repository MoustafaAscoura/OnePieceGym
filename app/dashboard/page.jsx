'use client'

import Grid from '@mui/material/Grid';
import BasicCard from '@/app/ui/dashboard/card'
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { setTraineesCount } from "../lib/store/slices/traineesSlice";
import { setPaymentsSum } from '../lib/store/slices/paymentsSlice';
import { setSessionsCount } from '../lib/store/slices/sessionsSlice';
import { setCoachesCount } from '../lib/store/slices/coachesSlice';
import { setProgramsCount } from '../lib/store/slices/programsSlice';
import { setMessagesCount } from '../lib/store/slices/messagesSlice';

export default function Dashboard() {
  const dispatch = useDispatch()
  const {count: traineesCount} = useSelector(state => state.traineesList)
  const {count: coachesCount} = useSelector(state => state.coachesList)
  const {count: sessionsCount} = useSelector(state => state.sessionsList)
  const {count: programsCount} = useSelector(state => state.programsList)
  const {unread: messagesCount} = useSelector(state => state.messagesList)
  const {sum : paymentsSum} = useSelector(state => state.paymentsList)

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

  function countCoaches () {
    fetch(`/api/coaches/count`)
    .then((response)=>{
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then((responseJson) => {
        dispatch(setCoachesCount(responseJson))
    }).catch((e)=>{
      console.log(e)
    })
  }

  function countPrograms () {
    fetch(`/api/programs/count`)
    .then((response)=>{
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then((responseJson) => {
        dispatch(setProgramsCount(responseJson))
    }).catch((e)=>{
      console.log(e)
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
    if (!traineesCount){
      countTrainees()
    }
    if (!coachesCount){
      countCoaches()
    }
    if (!paymentsSum){
      calcPayments()
    }
    if (!sessionsCount){
      countSessions()
    }
    if (!programsCount){
      countPrograms()
    }
    if (!messagesCount){
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
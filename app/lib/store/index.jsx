import {configureStore} from '@reduxjs/toolkit'
import traineesSlice from './slices/traineesSlice'
import coachesSlice from './slices/coachesSlice'
import paymentsSlice from './slices/paymentsSlice'
import sessionsSlice from './slices/sessionsSlice'
import programsSlice from './slices/programsSlice'
import messagesSlice from './slices/messagesSlice'

export default configureStore({
    reducer:{
        traineesList: traineesSlice,
        coachesList: coachesSlice,
        paymentsList: paymentsSlice,
        sessionsList: sessionsSlice,
        programsList: programsSlice,
        messagesList: messagesSlice,
    }
})
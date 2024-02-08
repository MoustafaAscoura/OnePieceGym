import {createSlice} from '@reduxjs/toolkit'


const Initial_State = {
    paymentsList: [],
    sum: false,
    status: 0
}

const paymentsSlice = createSlice({
    name: 'paymentsSlice',
    initialState: Initial_State,
    reducers:{
        setPaymentsList: (state,action) => {
            state.paymentsList = action.payload
            if (action.payload.length > 0) {
                state.status = 3
            } else {
                state.status = 2
            }
        },

        addToPaymentsList: (state, action) => {
            state.paymentsList.unshift(action.payload)
            state.sum += action.payload.amount
        },

        setPaymentsSum: (state, action) => {
            state.sum = action.payload || 0
            state.status = 1
        },

        removePayment: (state, action) => {
            state.paymentsList = state.paymentsList.filter(pay => pay.id != action.payload)
        },

        setErrorStatus: (state) => {
            state.status = -1
            state.sum = false
        }
    }
})

export const {setPaymentsList, addToPaymentsList, setErrorStatus, setPaymentsSum, removePayment} = paymentsSlice.actions
export default paymentsSlice.reducer;
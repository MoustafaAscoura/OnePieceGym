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
                state.status = 1
            }
        },

        addToPaymentsList: (state, action) => {
            state.paymentsList.push(action.payload)
        },

        setPaymentsSum: (state, action) => {
            state.sum = action.payload
        },

        setErrorStatus: (state) => {
            state.status = -1
        }
    }
})

export const {setPaymentsList, addToPaymentsList, setErrorStatus, setPaymentsSum} = paymentsSlice.actions
export default paymentsSlice.reducer;
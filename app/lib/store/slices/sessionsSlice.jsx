import {createSlice} from '@reduxjs/toolkit'

const Initial_State = {
    sessionsList: [],
    count: false,
    status: 0
}

const sessionsSlice = createSlice({
    name: 'sessionsSlice',
    initialState: Initial_State,
    reducers:{
        setSessionsList: (state,action) => {
            state.sessionsList = action.payload
            if (action.payload.length > 0) {
                state.status = 1
            }
        },

        addToSessionsList: (state, action) => {
            state.sessionsList.push(action.payload)
            state.count += 1
        },

        setSessionsCount: (state, action) => {
            state.count = action.payload
        },

        setErrorStatus: (state) => {
            state.status = -1
        }
    }
})

export const {setSessionsList, addToSessionsList, setErrorStatus, setSessionsCount} = sessionsSlice.actions
export default sessionsSlice.reducer;
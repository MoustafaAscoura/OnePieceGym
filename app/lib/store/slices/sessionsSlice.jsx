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
            if (action.payload.length) {
                state.status = 3
            } else {
                state.status = 2
            }
        },

        addToSessionsList: (state, action) => {
            state.sessionsList.unshift(action.payload)
            state.count += 1
            state.status = 3
        },

        setSessionsCount: (state, action) => {
            state.count = action.payload
            if (state.status < 1) state.status = 1
        },

        removeSession: (state, action) => {
            state.sessionsList = state.sessionsList.filter(session => session.id != action.payload)
            state.count -= 1
            if (!state.count) state.status = 2
        },

        setErrorStatus: (state) => {
            state.status = -1
        }
    }
})

export const {setSessionsList, addToSessionsList, setErrorStatus, setSessionsCount, removeSession} = sessionsSlice.actions
export default sessionsSlice.reducer;
import {createSlice} from '@reduxjs/toolkit'

const Initial_State = {
    programsList: [],
    count: false,
    status: 0
}

const programsSlice = createSlice({
    name: 'programsSlice',
    initialState: Initial_State,
    reducers:{
        setProgramsList: (state,action) => {
            state.programsList = action.payload
            if (action.payload.length > 0) {
                state.status = 1
            }
        },

        addToProgramsList: (state, action) => {
            state.programsList.push(action.payload)
            state.count += 1
        },

        setProgramsCount: (state, action) => {
            state.count = action.payload
        },

        setErrorStatus: (state) => {
            state.status = -1
        }
    }
})

export const {setProgramsList, addToProgramsList, setErrorStatus, setProgramsCount} = programsSlice.actions
export default programsSlice.reducer;
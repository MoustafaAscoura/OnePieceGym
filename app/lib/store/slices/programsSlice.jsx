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
                state.status = 3
            } else {
                state.status = 2
            }
            state.count = action.payload.length

        },

        removeFromProgramsList: (state,action) => {
            state.programsList = state.programsList.filter(program => program.id != action.payload)
            state.count = state.programsList.length
            if (!state.programsList.length) state.status = 2
        },

        addToProgramsList: (state, action) => {
            state.programsList.push(action.payload)
            state.count += 1
            if (state.status == 2) state.status = 3
        },

        editProgram: (state, action) => {
            let index = state.programsList.findIndex(elem => elem.id == action.payload.id)
            state.programsList[index] = action.payload
        },

        setErrorStatus: (state) => {
            state.status = -1
        }
    }
})

export const {setProgramsList, addToProgramsList, setErrorStatus, removeFromProgramsList, editProgram} = programsSlice.actions
export default programsSlice.reducer;
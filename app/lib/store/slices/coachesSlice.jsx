import {createSlice} from '@reduxjs/toolkit'


const Initial_State = {
    coachesList: [],
    count: false,
    status: 0
}

const coachesSlice = createSlice({
    name: 'coachesSlice',
    initialState: Initial_State,
    reducers:{
        setCoachesList: (state,action) => {
            state.coachesList = action.payload
            if (action.payload.length > 0) {
                state.status = 3
            } else {
                state.status = 2
            }
            state.count = state.coachesList.length

        },

        addToCoachesList: (state, action) => {
            state.coachesList.push(action.payload)
            state.count = state.coachesList.length
            if (state.status === 2) state.status = 3

        },

        editCoach: (state, action) => {
            let index = state.coachesList.findIndex(elem => elem.id == action.payload.id)
            state.coachesList[index] = action.payload
        },

        removeFromCoachesList: (state,action) => {
            state.coachesList = state.coachesList.filter(coach => coach.id != action.payload)
            state.count = state.coachesList.length
            if (!state.coachesList.length) state.status = 2

        },

        setErrorStatus: (state) => {
            state.status = -1
        }
    }
})

export const {setCoachesList, addToCoachesList, removeFromCoachesList, setErrorStatus, editCoach} = coachesSlice.actions
export default coachesSlice.reducer;
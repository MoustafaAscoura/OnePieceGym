import {createSlice} from '@reduxjs/toolkit'


const Initial_State = {
    coachesList: [],
    count: false
}

const coachesSlice = createSlice({
    name: 'coachesSlice',
    initialState: Initial_State,
    reducers:{
        setCoachesList: (state,action) => {
            state.coachesList = action.payload
        },

        addToCoachesList: (state, action) => {
            state.coachesList.push(action.payload)
            state.count += 1

        },

        removeFromCoachesList: (state,action) => {
            state.coachesList.pop(state.coachesList.indexOf(action.payload))
            state.count -= 1

        },

        setCoachesCount: (state, action) => {
            state.count = action.payload
        }
    }
})

export const {setCoachesList, addToCoachesList, removeFromCoachesList, setCoachesCount} = coachesSlice.actions
export default coachesSlice.reducer;
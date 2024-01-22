import {createSlice} from '@reduxjs/toolkit'


const Initial_State = {
    traineesList: [],
    count: false,
    status: 0,
}

const traineesSlice = createSlice({
    name: 'traineesSlice',
    initialState: Initial_State,
    reducers:{
        setTraineesList: (state,action) => {
            state.traineesList = action.payload
            if (action.payload.length > 0) {
                state.status = 1
            }
        },

        setTraineesCount: (state, action) => {
            state.count = action.payload
        },

        addToTraineesList: (state, action) => {
            state.traineesList.push(action.payload)
            state.count += 1
        },

        removeFromTraineesList: (state,action) => {
            state.traineesList = state.traineesList.filter(trainee => trainee.id != action.payload)
            state.count -= 1
        },

        editTrainee: (state, action) => {
            console.log(action.payload)
            let index = state.traineesList.findIndex(elem => elem.id == action.payload.id)
            console.log(index)
            console.log(state.traineesList)
            state.traineesList[index] = action.payload
            console.log(state.traineesList)
        },

        clearTraineesList: (state) => {
            state.traineesList = []
            state.status = 0
            state.count = 0
        },

        setErrorStatus: (state) => {
            state.status = -1
        }
    }
})

export const {setTraineesList, addToTraineesList, removeFromTraineesList, clearTraineesList, setErrorStatus, editTrainee, setTraineesCount} = traineesSlice.actions
export default traineesSlice.reducer;
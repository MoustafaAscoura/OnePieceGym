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
            state.count = action.payload.length
            if (action.payload.length > 0) {
                state.status = 3
            } else {
                state.status = 2
            }
        },

        setTraineesCount: (state, action) => {
            state.count = action.payload
            state.status = 1
        },

        addToTraineesList: (state, action) => {
            state.traineesList.push(action.payload)
            state.count += 1
            if (state.status === 2) state.status = 3
        },

        removeFromTraineesList: (state,action) => {
            state.traineesList = state.traineesList.filter(trainee => trainee.id != action.payload)
            state.count -= 1
            if (!state.traineesList.length) state.status = 2
        },

        editTrainee: (state, action) => {
            let index = state.traineesList.findIndex(elem => elem.id == action.payload.id)
            state.traineesList[index] = action.payload
        },

        setErrorStatus: (state) => {
            state.status = -1
        }
    }
})

export const {setTraineesList, addToTraineesList, removeFromTraineesList, setErrorStatus, editTrainee, setTraineesCount} = traineesSlice.actions
export default traineesSlice.reducer;
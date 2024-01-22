import {createSlice} from '@reduxjs/toolkit'

const Initial_State = {
    messagesList: [],
    unread: false,
    status: 0
}

const messagesSlice = createSlice({
    name: 'messagesSlice',
    initialState: Initial_State,
    reducers:{
        setMessagesList: (state,action) => {
            state.messagesList = action.payload
            if (action.payload.length > 0) {
                state.status = 1
            }
        },

        setMessagesCount: (state, action) => {
            state.unread = action.payload
        },

        setErrorStatus: (state) => {
            state.status = -1
        }
    }
})

export const {setMessagesList, setErrorStatus, setMessagesCount} = messagesSlice.actions
export default messagesSlice.reducer;
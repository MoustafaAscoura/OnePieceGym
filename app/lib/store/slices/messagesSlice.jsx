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
                state.status = 3
            } else {
                state.status = 1
            }
        },

        setMessagesCount: (state, action) => {
            state.unread = action.payload
            state.status = 1
        },

        setSeenMessage: (state, action) => {
            let index = state.messagesList.findIndex(elem => elem.id == action.payload)
            state.messagesList[index].read = true
        },

        removeMessage: (state, action) => {
            state.messagesList = state.messagesList.filter(message => message.id != action.payload)
            if (!state.messagesList.length) state.status = 2
        },

        setErrorStatus: (state) => {
            state.status = -1
        }
    }
})

export const {setMessagesList, setErrorStatus, setMessagesCount, setSeenMessage, removeMessage} = messagesSlice.actions
export default messagesSlice.reducer;
import {createSlice} from '@reduxjs/toolkit'


const Initial_State = {
    testimonials: [],
    images: [],
    video: "",
    status: 0,
}

const settingsSlice = createSlice({
    name: 'settingsSlice',
    initialState: Initial_State,
    reducers:{
        setSettings: (state,action) => {
            state.testimonials = action.payload.testimonials
            state.images = action.payload.images
            state.video = action.payload.video
            state.status = 1
        },

        addToImages: (state, action) => {
            state.images.push(action.payload)
        },

        addToTestimonials: (state, action) => {
            state.testimonials.push(action.payload)
        },

        removeFromImages: (state,action) => {
            state.images.splice(action.payload, 1)
        },

        removeFromTestimonials: (state,action) => {
            state.testimonials = state.testimonials.filter(test => test.id != action.payload)
        },

        setVideo: (state, action) => {
            state.video = action.payload
        },

        setErrorStatus: (state, action) => {
            state.status = action.payload
        }
    }
})

export const {setSettings, addToImages, addToTestimonials, removeFromImages, removeFromTestimonials, setVideo, setErrorStatus} = settingsSlice.actions
export default settingsSlice.reducer;
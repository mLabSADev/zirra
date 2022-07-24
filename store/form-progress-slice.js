import { createSlice } from "@reduxjs/toolkit";

const incidentFormProgress = createSlice({
    name:'incidentFormProgress',
    initialState: {
        count: 0
    },
    reducers: {
        increment(state) {
            state.count++
        },
        decrement (state) {
            state.count--
        }
    }
})

export const {increment, decrement} = incidentFormProgress.actions
export default incidentFormProgress.reducer
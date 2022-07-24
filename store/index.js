import { configureStore } from "@reduxjs/toolkit";
import incidentSlice from "./incident-form-slice";
const store = configureStore({
    reducer: {
        incident: incidentSlice
    }
})

export default store
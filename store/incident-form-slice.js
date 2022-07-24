import { createSlice } from "@reduxjs/toolkit";

const incidentSlice = createSlice({
    name: 'incident',
    initialState: {
        incidentInfo: {
            whatProvince: '',
            whatTown: '',
            additionalDetails: '',
            media: {
                video: '',
                picture: ''
            },
            isHappening: false,
            dateOfIncident: '',
            knowPerson: false,
            personFullName: '',
            anotherPerson: false,
            anotherPersonFullName: '',
            infoAboutPerson: '',
            contactNumber: '',
            contactEmail: '',
            isWitness: false,
            witnessDetails: '',
            whatHappened: '',
            isMatterReported: false,
            matterResolvedByOrg: false,
            interpreterNeeded: false,
            reliefSought: '',
            howDidYouHearAboutUs: ''

        }
    },
    reducers: {
        updateInfo(state, action) {
            // payload: {type, data}
            const DATA = action.payload
        }
    }
})

export const formActions = incidentSlice.actions

export default incidentSlice
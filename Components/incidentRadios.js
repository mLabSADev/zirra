const incidentRadio = {
    isHappening: {
        title: "Is it still hapenning?*",
        options: ["Yes", 'No', 'Not Sure']
    },
    occuredAtSchool: {
        title: 'Did this incident occur at a school?',
        options: ['Yes', 'No']
    },
    personDetais: {
        title: "Do you know the person's details?",
        options: ['Yes', 'No']
    },
    isTwoPeople: {
        title: "Is it more than one person?",
        options: ["Yes", "No"]
    },
    wasWitness: {
        title: "Was there a witness and do you have their details?",
        options: ["Yes", 'No']
    },
    isReported: {
        title: 'Have you reported the matter to anyone else?',
        options: ['Yes', 'No']
    },
    didOrganisationResolve: {
        title: "Did the person/organisation (who allegedly violated rights) try to resolve the matter?",
        options: ['Yes', 'No']
    },
    needInterpreter: {
        title: 'Do you need an interpreter',
        options: ["Yes", "No"]
    },
    relief: {
        title: 'Relief Sought:',
        options: ["Apology", "Mediation", "Other"]
    },
    herdAboutUs: {
        title: 'Tell us how you heard about the SAHRC e.g radio advert, newspaper, poster, from a friend, etc',
        options: ['Radio', 'Newspaper', 'Poster', 'From a friend', 'Social Media', 'Website', 'Other']
    }

}

export default incidentRadio;
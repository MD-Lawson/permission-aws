import { SET_APPLICATIONS, SET_SELECTED_APPLICATION} from "./actionTypes";

export const setApplications = applications => ({
    type: SET_APPLICATIONS,
    payload: applications
});

export const setSelectedApplication = application => ({
    type: SET_SELECTED_APPLICATION,
    payload: application,
})


export * from "./featuresActions.js";
export * from "./featureSetActions.js";
export * from "./rolesActions.js";
export * from "./groupsActions.js";
export * from "./usersActions.js";
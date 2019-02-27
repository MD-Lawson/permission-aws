import {SET_APPLICATIONS, SET_SELECTED_APPLICATION} from "../actions/actionTypes";


const initialState = {
    applications: [],
    selectedApplication: 1,
};
export default function navReducer (state = initialState, action) {
    switch (action.type) {

        case SET_APPLICATIONS:
            return {
                ...state,
                applications: action.payload,
            };
        
        case SET_SELECTED_APPLICATION:
            return {
                ...state, 
                selectedApplication: action.payload,
            }

        default:
            return state;
    }
};
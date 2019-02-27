import { FETCH_USERS_SUCCESS, EDIT_USER, ADD_NEW_USER } from "../actions/actionTypes";

const initialState = {
    users: [],
};

export default function usersReducer(state = initialState, action) {

    var newState = { ...state }

    switch (action.type) {

        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload.users
            };

        case EDIT_USER:
            newState = { ...state };
            newState.users = newState.users.map(user => {
                if (user.UserId === action.payload.UserId) {
                    user = action.payload
                }
                return user;
            })
            return newState;

        case ADD_NEW_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }

        default:
            return state;
    }
};
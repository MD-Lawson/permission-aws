import { FETCH_ROLES_SUCCESS, EDIT_ROLE } from "../actions/actionTypes";

const initialState = {
    roles: [],
};

export default function rolesReducer(state = initialState, action) {

    var newState = {...state}

    switch (action.type) {

        case FETCH_ROLES_SUCCESS:
            return {
                ...state,
                roles: action.payload.roles
            };

        case EDIT_ROLE:
            newState = { ...state };
            newState.roles = newState.roles.map(role => {
                if (role.RoleId === action.payload.RoleId) {
                    role = action.payload
                }
                return role;
            })
            return newState;

        default:
            return state;
    }
};
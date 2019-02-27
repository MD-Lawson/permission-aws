import { FETCH_GROUPS_SUCCESS, EDIT_GROUP, EDIT_GROUP_USERS } from "../actions/actionTypes";

const initialState = {
    groups: [],
};

export default function groupsReducer(state = initialState, action) {

    var newState = { ...state }

    switch (action.type) {

        case FETCH_GROUPS_SUCCESS:
            return {
                ...state,
                groups: action.payload.groups
            };

        case EDIT_GROUP:
            newState = { ...state };
            newState.groups = newState.groups.map(group => {
                if (group.GroupId === action.payload.GroupId) {
                    group = action.payload
                }
                return group;
            })
            return newState;

        case EDIT_GROUP_USERS:
            newState = { ...state };
            newState.groups = newState.groups.map(group => {
                if (group.GroupId === action.payload.index) {
                    group.Users = group.Users.concat(action.payload.newGroupUser)
                }
                return group
            })
            return newState

        default:
            return state;
    }
};
import { FETCH_GROUPS_SUCCESS, EDIT_GROUP, EDIT_GROUP_USERS } from "./actionTypes"
import axios from 'axios';

export const fetchGroupsSuccess = groups => ({
    type: FETCH_GROUPS_SUCCESS,
    payload: { groups }
});

export function fetchGroups(path) {
    return dispatch => {
        return axios.get(path)
        .then(response =>  dispatch(fetchGroupsSuccess(response.data)))
    }
}

export function postNewGroup(newGroup) {

    return dispatch => {

        axios.post(`/api/groups/` + newGroup.GroupId + `/save`, newGroup).then(res => {
            
        })
    }
}

export const editGroup = (updatedGroup) => ({
    type: EDIT_GROUP,
    payload: updatedGroup,
})

export const editGroupUsers = (newGroupUser, index) => ({
    type: EDIT_GROUP_USERS,
    payload: {newGroupUser, index},
})

export function postGroupEdits(updatedGroup) {
    

    return dispatch => {

        axios.post(`/api/groups/` + updatedGroup.GroupId 
                    + `/save`, updatedGroup).then(res => {
                        console.log(res);

        })
    }
}
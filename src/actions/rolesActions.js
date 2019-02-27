import { FETCH_ROLES_SUCCESS, EDIT_ROLE } from "./actionTypes"
import axios from 'axios';

export const fetchRolesSuccess = roles => ({
    type: FETCH_ROLES_SUCCESS,
    payload: { roles }
});

export const editRole = (newRole) => ({
    type: EDIT_ROLE,
    payload: newRole,
})

export function fetchRoles(path) {
    return dispatch => {
        return axios.get(path)
        .then(response =>  dispatch(fetchRolesSuccess(response.data)))
    }
}

export function postRoleEdits(newRole) {
    return dispatch => {
        axios.post(`/api/roles/` + newRole.RoleId + `/save`, newRole).then(res => {
             
        })
    }
}
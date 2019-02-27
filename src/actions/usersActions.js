import { FETCH_USERS_SUCCESS, EDIT_USER, ADD_NEW_USER } from "./actionTypes"
import axios from 'axios';

export const fetchUsersSuccess = users => ({
    type: FETCH_USERS_SUCCESS,
    payload: { users }
});

export const editUser = (updatedUser) => ({
    type: EDIT_USER,
    payload: updatedUser,
});

export const addNewUser = (newUser) => ({
    type: ADD_NEW_USER,
    payload: newUser,
})

export function fetchUsers(path) {
    return dispatch => {
        return axios.get(path)
        .then(response =>  dispatch(fetchUsersSuccess(response.data)))
    }
}


export function postUserEdits(updatedUser) {

    return dispatch => {
        axios.post(`/api/users/` + updatedUser.UserId + `/save`, updatedUser).then(res => {
            

        })
    }
}

export function saveUserOnGroup(groupUser) {

    return dispatch => {
        axios.post(`/api/users/` + groupUser.UserId + `/saveUserOnGroup`, groupUser).then(res => {
            

        })
    }
}

export function postNewUser(newUser) {

    return dispatch => {

        axios.post(`/api/users/` + newUser.UserId + `/save`, newUser).then(res => {
            
        })
    }
}
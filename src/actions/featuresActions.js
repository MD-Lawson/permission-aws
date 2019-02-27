import {
    FETCH_FEATURES_BEGIN, FETCH_FEATURES_SUCCESS, FETCH_FEATURES_FAILURE,
    UPDATE_ENABLE, POST_FEATURES_BEGIN, POST_FEATURES_SUCCESS, POST_FEATURES_FAILURE
} from "./actionTypes"
import axios from 'axios';

export const fetchFeaturesBegin = () => ({
    type: FETCH_FEATURES_BEGIN
});

export const fetchFeaturesSuccess = features => ({
    type: FETCH_FEATURES_SUCCESS,
    payload: { features }
});

export const fetchFeaturesFailure = error => ({
    type: FETCH_FEATURES_FAILURE,
    payload: { error }
});

export function fetchFeatures(path) {
    return dispatch => {
        dispatch(fetchFeaturesBegin());
        return axios.get(path).then(response => {
            dispatch(fetchFeaturesSuccess(response.data))
        }).catch((response) => {
            dispatch(fetchFeaturesFailure(response));
        })
    }
}

export const postFeaturesBegin = () => ({
    type: POST_FEATURES_BEGIN,
})

export const postFeaturesSuccess = () => ({
    type: POST_FEATURES_SUCCESS,
})

export const postFeaturesFailure = () => ({
    type: POST_FEATURES_FAILURE,
})

export const updateEnable = (id, enable) => ({
    type: UPDATE_ENABLE,
    payload: { id, enable }
})

export function postFeatures(id, enable, newFeature) {

    return dispatch => {
        // dispatch(updateEnable(id, enable));
        console.log(newFeature);
        return (
            // axios.post('/api/features', newFeature).then(response => {
            //     dispatch(updateEnable(id, enable))
            // }).then(() => {
            //     dispatch(postFeaturesSuccess());
            // }).catch((response) => {

            // })
            axios({
                method: 'post',
                url: '/api/features',
                data: newFeature,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                dispatch(updateEnable(id, enable))
            }).then(() => {
                dispatch(postFeaturesSuccess());
            }).catch((response) => {

            })
        )
    }
}
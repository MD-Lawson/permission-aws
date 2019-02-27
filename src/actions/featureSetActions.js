import { FETCH_FEATURESETS_SUCCESS, EDIT_FEATURESET_FEATURES, EDIT_FEATURESET_NAME, EDIT_FEATURESET_DESCRIPTION, FETCH_FEATURESETS_BEGIN, FETCH_FEATURESETS_FAILURE } from "./actionTypes"
import axios from 'axios';

export const fetchFeatureSetsBegin = () => ({
    type: FETCH_FEATURESETS_BEGIN
});

export const fetchFeatureSetsSuccess = featureSets => ({
    type: FETCH_FEATURESETS_SUCCESS,
    payload: { featureSets }
});

export const fetchFeatureSetsFailure = error => ({
    type: FETCH_FEATURESETS_FAILURE,
    payload: { error }
});

export function fetchFeatureSets(path) {
        return dispatch => {
            dispatch(fetchFeatureSetsBegin());
            return axios.get(path).then(response =>  {
                dispatch(fetchFeatureSetsSuccess(response.data))
            }).catch((response) => {
                dispatch(fetchFeatureSetsFailure(response));
            })
        }
}

export function postFeatureSets(newFeatureSet) {
    return dispatch => {
        axios.post(`/api/featuresets/save`, newFeatureSet).then(res => {

        })
    }
}

export function postFeatureSetEdits(updatedFeatureSet) {
    
    return dispatch => {
        axios.post(`/api/featuresets/save`, updatedFeatureSet).then(res => {

        })
    }
}

export function saveFeatureSetFeature(featureSetFeature) {   
    return dispatch => {
        axios.post(`/api/featuresets/`+ featureSetFeature.FeatureSetId + `/savefeature`, featureSetFeature).then(res => { 

        })
    }
}

export const editFeatureSetFeatures = (newFeatures, index) => ({
    type: EDIT_FEATURESET_FEATURES,
    payload: {newFeatures, index},

})

export const editFeatureSetName = (name, index) => ({
    type: EDIT_FEATURESET_NAME,
    payload: {name, index},

})

export const editFeatureSetDescription = (description, index) => ({
    type: EDIT_FEATURESET_DESCRIPTION,
    payload: {description, index},

})

export function editFeatureSet(updatedFeatureSet) {
    return dispatch => {
        dispatch(editFeatureSetFeatures(updatedFeatureSet.Features, updatedFeatureSet.FeatureSetId));
        dispatch(editFeatureSetName(updatedFeatureSet.Name, updatedFeatureSet.FeatureSetId));
        dispatch(editFeatureSetDescription(updatedFeatureSet.Description, updatedFeatureSet.FeatureSetId));
    }
}
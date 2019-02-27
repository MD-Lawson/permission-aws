import { FETCH_FEATURESETS_SUCCESS, EDIT_FEATURESET_FEATURES, EDIT_FEATURESET_DESCRIPTION, EDIT_FEATURESET_NAME } from "../actions/actionTypes";


const initialState = {
    featureSets: [],
};
export default function featureSetReducer(state = initialState, action) {

    var newState = {...state}

    switch (action.type) {

        case FETCH_FEATURESETS_SUCCESS:
            return {
                ...state,
                featureSets: action.payload.featureSets
            };

        case EDIT_FEATURESET_FEATURES:
            newState = { ...state };
            newState.featureSets = newState.featureSets.map(featureSet => {
                if (featureSet.FeatureSetId === action.payload.index) {
                    featureSet.Features = action.payload.newFeatures
                }
                return featureSet
            })
            return newState

        case EDIT_FEATURESET_NAME:
            newState = { ...state };
            newState.featureSets = newState.featureSets.map(featureSet => {
                if (featureSet.FeatureSetId === action.payload.index) {
                    featureSet.Name = action.payload.name
                }
                return featureSet
            })
            return newState

        case EDIT_FEATURESET_DESCRIPTION:
            newState = { ...state };
            newState.featureSets = newState.featureSets.map(featureSet => {
                if (featureSet.FeatureSetId === action.payload.index) {
                    featureSet.Description = action.payload.description
                }
                return featureSet
            })
            return newState

        default:
            return state;
    }
};
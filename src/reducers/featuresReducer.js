import {FETCH_FEATURES_BEGIN, FETCH_FEATURES_SUCCESS, FETCH_FEATURES_FAILURE, UPDATE_ENABLE} from "../actions/actionTypes";


const initialState = {
    features: [],
    loading: false,
    error: null,
};
export default function featureReducer (state = initialState, action) {
    switch (action.type) {

        case FETCH_FEATURES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_FEATURES_SUCCESS:
            return {
                ...state,
                loading: false,
                features: action.payload.features
            };

        case FETCH_FEATURES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };

        case UPDATE_ENABLE:
            const newState = {...state};
            newState.features = newState.features.map( feature => {
                if(feature.FeatureId === action.payload.id) {
                    feature.Enable = action.payload.enable
                }
                return feature
            })
            return newState

        default:
            return state;
    }
};
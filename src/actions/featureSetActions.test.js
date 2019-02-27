import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index.js';
import * as types from './actionTypes';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    var applicationId
    beforeEach(() => {
        applicationId = 1;
        mock = new MockAdapter(axios);
    })
    afterEach(() => {
        mock.reset();
    })

    it('creates FETCH_FEATURESETS_SUCCESS when fetching features has been done', () => {
        mock.onGet('/api/features?applicationId=' + applicationId).reply(200, {
            featureSets: [
                { FeatureSetId: 5, name: 'FeatureDevelopmentSet' }
            ]
        });
        const expectedActions = [
            { type: types.FETCH_FEATURESETS_BEGIN },
            {
                type: types.FETCH_FEATURESETS_SUCCESS, payload: {
                    featureSets: {
                        featureSets: [
                            { FeatureSetId: 5, name: 'FeatureDevelopmentSet' }
                        ]
                    }
                }
            }
        ]

        const store = mockStore({ featuresSets: [] })

        return store.dispatch(actions.fetchFeatureSets('/api/features?applicationId=' + applicationId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })

    it('creates FETCH_FEATURESETS_FAILURE when fetching features has been done', () => {
        mock.onGet('/api/features?applicationId=' + applicationId).networkError();
        const expectedActions = [
            { type: types.FETCH_FEATURESETS_BEGIN },
            {
                type: types.FETCH_FEATURESETS_FAILURE, payload: { error: Error('Network Error') }
            }
        ]

        const store = mockStore({ features: [] })

        return store.dispatch(actions.fetchFeatureSets('/api/features?applicationId=' + applicationId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })

    it('creates Actions when editing Feature Set', () => {
        mock.onPost('/api/features').reply(200);
        var updatedFeatureSet = {
            FeatureSetId: 5,
            Name: 'FeatureDevelopmentSet',
            Description: 'Feature Development',
            Features: [
                {
                    FeatureId: 5,
                    Name: 'ActivityFeed'
                }
            ]
        }

        const expectedActions = [
            {
                type: types.EDIT_FEATURESET_FEATURES,
                payload: {
                    index: 5,
                    newFeatures: [
                        {
                            FeatureId: 5,
                            Name: 'ActivityFeed'
                        }
                    ]
                }
            },
            {
                type: types.EDIT_FEATURESET_NAME,
                payload: { 
                    index: 5, 
                    name: 'FeatureDevelopmentSet' 
                }
            },
            {
                type: types.EDIT_FEATURESET_DESCRIPTION,
                payload: {
                    index: 5,
                    description: 'Feature Development'
                }
            }
        ]

        const store = mockStore({ featureSets: [] })

        store.dispatch(actions.editFeatureSet(updatedFeatureSet))
        expect(store.getActions()).toEqual(expectedActions)
    })
})
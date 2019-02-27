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
    // beforeEach(() => {
    //     mock = new MockAdapter(axios);
    // })
    afterEach(() => {
        mock.reset();
    })

    it('creates FETCH_FEATURES_SUCCESS when fetching features has been done', () => {
        mock.onGet('/api/features').reply(200, {
            features: [
                { FeatureId: 5, name: 'ActivityFeed' }
            ]
        });

        const expectedActions = [
            { type: types.FETCH_FEATURES_BEGIN },
            {
                type: types.FETCH_FEATURES_SUCCESS, payload: {
                    features: {
                        features: [
                            { FeatureId: 5, name: 'ActivityFeed' }
                        ]
                    }
                }
            }
        ]

        const store = mockStore({ features: [] })

        return store.dispatch(actions.fetchFeatures("/api/features")).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })

    it('creates FETCH_FEATURES_FAILURE when fetching features has been done', () => {
        mock.onGet('/api/features').networkError();
        const expectedActions = [
            { type: types.FETCH_FEATURES_BEGIN },
            {
                type: types.FETCH_FEATURES_FAILURE, payload: { error: Error('Network Error')}
            }
        ]

        const store = mockStore({ features: [] })

        return store.dispatch(actions.fetchFeatures("/api/features")).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })

    it('creates UPDATE_ENABLE when posting has been done', () => {
        mock.onPost('/api/features').reply(200);

        const expectedActions = [
            {
                type: types.UPDATE_ENABLE,
                payload: { enable: true, id: 5 }
            },
            { type: types.POST_FEATURES_SUCCESS }
        ]

        const store = mockStore({ features: [] })

        return store.dispatch(actions.postFeatures(5, true, {FeatureId: 5, Name: 'ActivityFeed'})).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
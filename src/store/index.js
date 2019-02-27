import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';

// const store = createStore(rootReducer);

const initialState = {
  features: [""],
  featureSets: [""],
};

// const composeEnhancer = initialState || compose;

 /* eslint-disable no-underscore-dangle */
const store =createStore(
      rootReducer, applyMiddleware(thunk)
    );

/* eslint-enable */

export default store;

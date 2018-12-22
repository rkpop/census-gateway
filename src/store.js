import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { routerForBrowser, initializeCurrentLocation } from 'redux-little-router';
import { reducer as userReducer } from './modules/user';

const routes = {
    '/': {
        title: "Home"
    },
    '/poll': {
        title: "Poll"
    },
    '/sign-in': {
        title: "Signing-in"
    },
    '/not-eligible': {
        title: "Not Eligible",
    }
};
const initialState = {};
const enhancers = []

const { reducer, middleware, enhancer } = routerForBrowser({
    // The configured routes. Required.
    routes,
});

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}


const store = createStore(
    combineReducers({ router: reducer, user: userReducer }),
    initialState,
    compose(enhancer, applyMiddleware(middleware), ...enhancers)
);
const initialLocation = store.getState().router;
if (initialLocation) {
    store.dispatch(initializeCurrentLocation(initialLocation));
}

export default store;

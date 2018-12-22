
import * as types from './types';

const initialState = {
    token: null,
    isAuthenticated: false,
    isEligible: false,
    username: null,
    createdUtc: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_USER_AUTHENTICATION:
            return { ...state, isAuthenticated: true, token: action.token }
        case types.SET_USER_AUTHENTICATION:
            return {
                ...state,
                ...action.payload,
            }
        case types.SET_USER_ELIGIBLE:
            return {
                ...state,
                isEligible: true,
            }
        case types.LOG_OUT:
            return initialState;
        default:
            return state
    }
}



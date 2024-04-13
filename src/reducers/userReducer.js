import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from "../constants/userConstant"

const initialState = {
    token: localStorage.getItem('authToken'),
    isAuthenticated: localStorage.getItem('authToken') ? true : false,
    loading: false,
    isRegistered: false
}

export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state
    }

}
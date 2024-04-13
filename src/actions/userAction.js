import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from "../constants/userConstant";
import axios from "axios";


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST,
        });

        const { data } = await axios.post(
            `https://soriic-b-rana-usmans-projects.vercel.app/api/v1/login`,
            { email, password }
        );

        localStorage.setItem('authToken', data.token);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};



export const logout = () => async (dispatch) => {

    try {
        await axios.get(`https://soriic-b-rana-usmans-projects.vercel.app/api/v1/logout`)
        localStorage.removeItem('authToken');
        dispatch({ type: LOGOUT_SUCCESS })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

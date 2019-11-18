import { AUTH_USER, AUTH_ERROR } from './types';
import axios from 'axios';

export const signup = (formProps , callback) => async dispatch => {
    try {
        const response = await axios.post(
            'http://locahost:3090/signup',
            formProps
        );
        dispatch({ type: AUTH_USER, payload: response.data.token});
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: "Email in use"});
    }
    
    // we can return a function or an object when using thunk
    // thunk allows us to dispatch as many actions as we want even using promises
    // (dispatch) => {

    // }
    // return function(dispatch) {
    //     dispatch({
    //         type: AUTH_USER
    //     });
    // };
    // return {
    //     type: auth_user,
    //     payload: '102301923'
    // };
};

export const signout = () => {
    localStorage.clearItem('token');
    return {
        type: AUTH_USER,
        payload: ''
    }
}
import { SET_USER, USER_LOGOUT } from '../types/types';



const initialState = {
    currentUser: {},
    isAuth: false
}

export default function userReducer ( state = initialState, action) { 
    switch (action.type) {
        case SET_USER : 
        return { 
            ...state,
            currentUser: action.payload,
            isAuth: true
        }
        case USER_LOGOUT: 
        localStorage.removeItem('token')
        return { 
            ...state,
            currentUser: {},
            isAuth: false
        }
        
        default:
            return state
    }
}


export const setUser = user => ({type: SET_USER, payload: user })
export const logoutUser = user => ({type: USER_LOGOUT})
export const SET_USER = "SET_USER";
export const USER_LOGOUT = "USER_LOGOUT";

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
import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer';
import fileReducer from './reducers/fileReducer';
import uploadReducer from './reducers/uploadReducer';
import appReducer from './reducers/appReducer';


const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
    files: fileReducer,
    upload: uploadReducer,
});

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
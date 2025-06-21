import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import AuthReducer from "./accounts/AuthReducer";


export const rootReducer = combineReducers({
    auth: AuthReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
   reducer: rootReducer,
   devTools: true,
   middleware: [thunk]   
});
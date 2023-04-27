
import {configureStore} from "@reduxjs/toolkit"
import exp from "constants";
import { type } from "os";
import {TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"


// Here we configure the redux store that will initialize it and later we will follow this single 
//source of truth for all of our components 

// creatrStore

export const store = configureStore({
    reducer:{},
    devTools:process.env.NODE_ENV==='development',
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({}).concat([]),
})

// as we are working with type Script so we need to extract "ROOTSTATE" and APPSUDPATCH from the store 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// here we are creating appdipatch and selector
// to send someting to the store 
export const useAppDispatch = typeof useDispatch<AppDispatch>();
// to read someting fom the syore
export const useAppSelector : TypedUseSelectorHook<RootState>= useSelector

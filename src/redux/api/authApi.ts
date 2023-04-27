
// create  a login and register page 

//then we will get that reference here 

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_ENDPOINT as string;

// here we are calling the apis from the backedn using redux toolkit 

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl:`${BASE_URL}/api/auth`,
    }),
    endpoints: (builder)=>({
        registerUser: "need to use from register page",
        loginYser: "need to use from register page",
        verifyemail 
        logout
    })


})
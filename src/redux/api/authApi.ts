// create  a login and register page 
//then we will get that reference here 

import {RegisterInput} from "../../pages/register.page"
import customFetchBase from "./customFetchBase"

import {LoginInput} from "../../pages/login.page"

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { GenericResponse } from "./types";
const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_ENDPOINT as string;

// here we are calling the apis from the backedn using redux toolkit 

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: customFetchBase,
    endpoints: (builder)=>({
        loginUser: builder.mutation<GenericResponse, LoginInput>({
            query(data) {
              console.log("Performed");
              return {
                url: "auth/login",
                method: "POST",
                body: data,
              };
            },
        }),
        registerUser: builder.mutation<GenericResponse,RegisterInput>({
            query(data){

                console.log("Performed")
                return{
                    url:"auth/register",
                    method:"POST",
                    body:data
                }
            }
        }),
        verifyEmail: builder.mutation<GenericResponse, string>({
            query(){
                return{
                    url:'auth/verifyemail',
                    credentials: 'include'
                }
            }
        })
    })


})


export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useVerifyEmailMutation,
}= authApi
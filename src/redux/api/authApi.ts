// create  a login and register page 
//then we will get that reference here 

import {RegisterInput} from "../../pages/register.page"
// import {LoginInput} from "../../pages/login.page"

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { GenericResponse } from "./types";
const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_ENDPOINT as string;

// here we are calling the apis from the backedn using redux toolkit 

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl:`${BASE_URL}/api/auth`,
    }),
    endpoints: (builder)=>({
        registerUser: builder.mutation<GenericResponse,RegisterInput>({
            query(data){
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
        // loginUser:builder.mutation<{access_token:string;status:string}, LoginInput>({
        //     query(data){
        //         return{
        //             url:"auth/login",
        //             method:"POST",
        //             body:data,
        //             credentials:'include'
        //         }
        //     },
        //     async onQueryStarted(args,{dispatch,queryFulfilled}){
        //         try{
        //                // here we will get user details
        //         }catch(err){}
        //     }
        // })
        // loginYser: "need to use from register page",
        
        // logout
    })


})


export const {
    useRegisterUserMutation,
    useVerifyEmailMutation
}= authApi
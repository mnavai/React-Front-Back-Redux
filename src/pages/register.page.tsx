import { SubmitHandler, useForm,FormProvider } from "react-hook-form";
import { object, string, TypeOf } from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import userEvent from "@testing-library/user-event";
import { Container, Box, Typography } from "@mui/material";
import { useRegisterUserMutation } from "../redux/api/authApi";

// just for defining the schema for the UI we are creating that schema will 
// help us in validating the data effortlessly 
const registerSchema = object({
    name: string().min(1, "Full name is required").max(100),
    email: string().min(1, "Email is required").email("Email address is not valid"),
    password: string()
        .min(1, 'Passwrd is requird')
        .min(8, 'Passwrd must be of 8 characters long')
        .max(32, "Must be less than 30 cgaracters "),
    passwordConfirm: string().min(1, 'Passwrd is requird')
}).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match !'
});

export type RegisterInput = TypeOf<typeof registerSchema>

const RegisterPage = ()=>{
    const methoods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema)
    })

    // api call you will have the useRegisterMutation 

     const [registerUser, {isLoading,isSuccess,error,isError,data}]=useRegisterUserMutation()
     const navigate = useNavigate()
     const {reset, handleSubmit, formState:{isSubmitSuccessful},}= methoods;


     // this was specially for the errors if the form is successfully submitted 
     // it is possible we get errors from backend 
     useEffect(()=>{
        if(isSuccess) {
            toast.success(data?.message)
            navigate('/verifyemail')
        }
        // is ERROR gets you a list of items as we are in type Script so we are following any so that we could 
        // handle any type here 
        if(isError){
            if(Array.isArray((error as any).data.error)){
                (error as any).data.error.array.forEach((element:any) => {
                    toast.error(element.message,{position:'top-right'})
                });
            }
            else{
                toast.error((error as any).data.message,{position:'top-right'})
            }
        }
     },[isLoading])


     useEffect(()=>{
        if(isSubmitSuccessful){
            reset();
        }
     },[])

     const onSubmitHandeler: SubmitHandler<RegisterInput>=(values)=>{
        registerUser(values)
     }

     return(
        <Container
        maxWidth={false} 
        sx={{ display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#2363eb',}
        }>
            <Box>
                <Typography> Welcome to my Registration</Typography>

                <FormProvider {...methoods}></FormProvider>
            </Box>
            
        </Container>
     )

}

export default RegisterPage
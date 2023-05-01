import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { object, string, TypeOf } from "zod"
import { styled } from "@mui/material/styles"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import userEvent from "@testing-library/user-event";
import { Container, Box, Typography } from "@mui/material";
import { LoadingButton as _LoadingButton } from "@mui/lab";
import { useRegisterUserMutation } from "../redux/api/authApi";
import FormInput from "../components/FormInput";



const LoadingButton = styled(_LoadingButton)`
background-color:black
`



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
    message: `Passwords do not match ! `
});

export type RegisterInput = TypeOf<typeof registerSchema>

const RegisterPage = () => {
    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema)
    });
    // api call you will have the useRegisterMutation 
    const [registerUser, { isLoading, isSuccess, error, isError, data }] = useRegisterUserMutation()
    const navigate = useNavigate()
    const { reset, handleSubmit, formState: { isSubmitSuccessful }, } = methods;


    // this was specially for the errors if the form is successfully submitted 
    // it is possible we get errors from backend 
    useEffect(() => {
        console.log("Inside Use Effect")
        if (isSuccess) {

            toast.success(data?.message)
            navigate('/verifyemail')
        }
        // is ERROR gets you a list of items as we are in type Script so we are following any so that we could 
        // handle any type here 
        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.array.forEach((element: any) => {
                    toast.error(element.message, { position: 'top-right' })
                });
            }
            else {
                toast.error((error as any).data.message, { position: 'top-right' })
            }
        }
    }, [isLoading])

    console.log("After Use Effect", isLoading)
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [])
    console.log("After Use Effect 2 ")
    console.log(methods)
    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
        alert('Working')
        registerUser(values)
    }


    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#2363eb',
            }
            }>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }
            }>
                <Typography> Welcome to my Registration</Typography>


                <FormProvider {...methods}>
                    <Box
                        component='form'
                        noValidate
                        width='100%'
                        onSubmit={handleSubmit(onSubmitHandler)}
                    >
                        <FormInput name='name' label='full name'></FormInput>
                        <FormInput name='email' type="email" label='enter the email'></FormInput>
                        <FormInput name='password' type="password" label='enter the password'></FormInput>
                        <FormInput name='passwordConfirm' type="password" label='enter the password'></FormInput>

                        <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={isLoading}
                            disableElevation
                            fullWidth>
                            Sign Up
                        </LoadingButton>

                    </Box>

                    {/* <form onSubmit={handleSubmit(onSubmitHandler)}>
                
                       
                                <FormInput name='name' label='full name'></FormInput>
                                <FormInput name='email' type="email" label='enter the email'></FormInput>
                                <FormInput name='password' type="password" label='enter the password'></FormInput>
                                <FormInput name='passwordConfirm' type="password" label='enter the password'></FormInput>

                                <LoadingButton
                                variant="contained"
                                loading={isLoading}
                                disableElevation
                                fullWidth>
                                    Sign Up
                                </LoadingButton>
                     
                       <button>click</button>

               </form> */}
                </FormProvider>
            </Box>

        </Container>
    )

}

export default RegisterPage
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { styled } from "@mui/material/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import userEvent from "@testing-library/user-event";
import { Container, Box, Typography } from "@mui/material";
import { LoadingButton as _LoadingButton } from "@mui/lab";
import { useLoginUserMutation } from "../redux/api/authApi";
import FormInput from "../components/FormInput";

const LoadingButton = styled(_LoadingButton)`
  background-color: black;
`;

// Define the schema for the login form
const loginSchema = object({
  email: string().min(1, "Email is required").email("Email address is not valid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be less than 30 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  // API call to login user
  const [loginUser, { isLoading, isSuccess, error, isError, data }] = useLoginUserMutation();
  const navigate = useNavigate();
  const { reset, handleSubmit, formState: { isSubmitSuccessful } } = methods;

  // Handle success and error messages
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate("/");
    }

    if (isError) {
      toast.error((error as any).data.message, { position: "top-right" });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, []);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    alert("Working");
    loginUser(values);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#2363eb",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography> Welcome to my Login</Typography>

        <FormProvider {...methods}>
          <Box
            component="form"
            noValidate
            width="100%"
            onSubmit={handleSubmit(onSubmitHandler)}>
            <FormInput name="email" type="email" label="Enter your email" />
            <FormInput name="password" type="password" label="Enter your password" />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              disableElevation
              fullWidth>Login
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default LoginPage;

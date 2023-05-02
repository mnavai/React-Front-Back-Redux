import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import { LoadingButton as _LoadingButton } from "@mui/lab";


const LoadingButton = styled(_LoadingButton)`
  background-color: black;
`;

const DashboardPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
          console.log("Getting User Profile");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

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
        <Typography variant="h4" sx={{ mb: 2 }}>
          you have successfully logged in!
        </Typography>
        <LoadingButton
          variant="contained"
          disableElevation
          fullWidth
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/login");
          }}
        >
          Logout
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default DashboardPage;

import React from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import Noti from "../../handler/Noti";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordeErrText] = useState("");

  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    const data = {
      fullname: response.profileObj.name,
      username: response.profileObj.email + response.Ca,
      password: response.accessToken,
      avatar: response.profileObj.imageUrl,
    };
    localStorage.setItem("GGL", true);
    const token = await authApi.googleLogin(data);
    localStorage.setItem("token", token);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    let err = false;

    if (data.username === "") {
      err = true;
      setUsernameErrText("Username must be at least 8 characters");
    }
    if (data.password === "") {
      err = true;
      setPasswordeErrText("Password must be at least 8 characters");
    }
    if (err) return;

    setUsernameErrText("");
    setPasswordeErrText("");
    setLoading(true);
    try {
      const { token } = await authApi.signin(data);
      Noti("success", "Signin successfully");
      localStorage.setItem("token", token);
      setLoading(false);
      setUsernameErrText("");
      setPasswordeErrText("");
      navigate("/");
    } catch (error) {
      Noti("error", "Signin failure");
      setLoading(false);
      const errors = error.data.errors;
      errors.map((e) => {
        if (e.param === "username") {
          setPasswordeErrText(e.msg);
        }
        if (e.param === "password") {
          setPasswordeErrText(e.msg);
        }
      });
    }
  };

  return (
    <Box>
      <Container maxWidth="xs">
        <Paper sx={{ p: 3, mt: 10 }}>
          <Typography align="center" pb={3} variant="h4">
            Signin
          </Typography>
          <Box component={"form"} onSubmit={handleSubmit}>
            <TextField
              label="username"
              name="username"
              fullWidth
              margin="normal"
              error={usernameErrText !== ""}
              helperText={usernameErrText}
            />
            <TextField
              label="password"
              name="password"
              fullWidth
              margin="normal"
              type={"password"}
              error={passwordErrText !== ""}
              helperText={passwordErrText}
            />
            <LoadingButton
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              variant={"outlined"}
              loading={loading}
              type="submit"
            >
              Signin
            </LoadingButton>
            <Button
              fullWidth
              component={Link}
              to="/signup"
              sx={{ textTransform: "none" }}
            >
              Don't have an account? signup
            </Button>
            <Divider>
              <Chip label="OR" />
            </Divider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                pt: 3,
              }}
            >
              <GoogleLogin
                clientId="711694428793-21sv8ucq68aj5lho7cs9tpoa4ah6f5ch.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signin;

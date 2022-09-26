import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import Noti from "../../handler/Noti";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [fullnameErrText, setFullnameErrText] = useState("");
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordeErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordeErrText] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      fullname: formData.get("fullname"),
      username: formData.get("username"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    let err = false;

    if (data.fullname === "") {
      err = true;
      setFullnameErrText("Please fill in this field");
    }
    if (data.username === "") {
      err = true;
      setUsernameErrText("Username must be at least 8 characters");
    }
    if (data.password === "") {
      err = true;
      setPasswordeErrText("Password must be at least 8 characters");
    }
    if (data.confirmPassword === "") {
      err = true;
      setConfirmPasswordeErrText(
        "ConfirmPassword must be at least 8 characters"
      );
    }
    if (err) return;

    setFullnameErrText("");
    setUsernameErrText("");
    setPasswordeErrText("");
    setConfirmPasswordeErrText("");
    setLoading(true);
    try {
      const { token } = await authApi.signup(data);
      localStorage.setItem("token", token);
      Noti("success", "Signup successfully");
      navigate("/");
      setLoading(false);
      setFullnameErrText("");
      setUsernameErrText("");
      setPasswordeErrText("");
      setConfirmPasswordeErrText("");
    } catch (error) {
      Noti("error", "Signup failure");
      setLoading(false);
      const errors = error.data.errors;
      errors.map((e) => {
        if (e.param === "username") {
          setUsernameErrText(e.msg);
        }
        if (e.param === "password") {
          setPasswordeErrText(e.msg);
        }
        if (e.param === "confirmPassword") {
          setConfirmPasswordeErrText(e.msg);
        }
      });
    }
  };

  return (
    <Box>
      <Container maxWidth="xs">
        <Paper sx={{ p: 3, mt: 10 }}>
          <Typography align="center" pb={3} variant="h4">
            Signup
          </Typography>
          <Box component={"form"} onSubmit={handleSubmit}>
            <TextField
              label="fullname"
              name="fullname"
              fullWidth
              margin="normal"
              error={fullnameErrText !== ""}
              helperText={fullnameErrText}
            />
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
            <TextField
              label="confirm password"
              name="confirmPassword"
              fullWidth
              margin="normal"
              type={"password"}
              error={confirmPasswordErrText !== ""}
              helperText={confirmPasswordErrText}
            />
            <LoadingButton
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              variant={"outlined"}
              loading={loading}
              type="submit"
            >
              Signup
            </LoadingButton>
            <Button
              fullWidth
              component={Link}
              to="/signup"
              sx={{ textTransform: "none" }}
            >
              Already have an account? signup
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;

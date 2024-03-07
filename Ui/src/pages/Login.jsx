import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUser } from "../lib/apis";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { isLoading, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: loginUser,
    onSuccess: (response) => {
      //save token with user firstname user lastname
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("firstName", response?.data?.userDetails?.firstName);
      localStorage.setItem("lastName", response?.data?.userDetails?.lastName);

      navigate("/home");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  if (isLoading) {
    return <CircularProgress color="success" />;
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        textAlign: "center",
        backgroundSize: "cover",
      }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email()
            .required("email is required")
            .trim()
            .lowercase(),
          password: Yup.string().required("password is required").trim(),
        })}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ handleSubmit, getFieldProps, errors, touched }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              minHeight: "350px",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "mild",
              padding: "2rem",
              gap: "2rem",
              borderRadius: "10px",
              marginLeft: "38rem",
              marginTop: "8rem",
              boxShadow:
                "0 20px 40px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Typography variant="h5" color="Green">
              Sign In
            </Typography>
            <FormControl>
              <TextField label="Email" {...getFieldProps("email")} />
              {touched.email && errors.email ? (
                <FormHelperText error>{errors.email}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                {...getFieldProps("password")}
              />
              {touched.password && errors.password ? (
                <FormHelperText error>{errors.password}</FormHelperText>
              ) : null}
            </FormControl>
            <Button type="submit" variant="contained" color="success">
              Login
            </Button>
            <Link to="/register">
              <Typography variant="subtitle1" color="black">
                New User? Sign Up
              </Typography>
            </Link>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;

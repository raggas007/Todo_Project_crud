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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { registerUser } from "../lib/apis";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { isLoading, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: registerUser,
    onSuccess: (response) => {
      navigate("/login");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
  if (isLoading) {
    return <CircularProgress color="secondary" />;
  }
  return (
    <Box
      sx={{
        marginTop: "2rem",
        minHeight: "100vh",
        minWidth: "100vw",
        textAlign: "center",
        backgroundSize: "cover",
      }}
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .required("firstName is required")
            .trim()
            .max(40, "first name must be no more than 40 character"),
          lastName: Yup.string()
            .required("Lastname is required")
            .trim()
            .max(40, "last name must be no more than 40 character"),
          email: Yup.string()
            .required("email is required")
            .email("must be a valid email")
            .trim()
            .lowercase()
            .max(40, "email must be no more than 40 character"),
          password: Yup.string()
            .required("password is required.")
            .trim()
            .min(4, "password must be minimum of 4 character")
            .max(20, "password must not be more than 20 character"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Re-enter the password.")
            .trim(),
        })}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ handleSubmit, getFieldProps, errors, touched }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "2rem",
              marginLeft: "600px",
              width: "330px",
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }}
          >
            <Typography variant="h5">Sign Up</Typography>
            <FormControl>
              <TextField label="First Name" {...getFieldProps("firstName")} />
              {touched.firstName && errors.firstName ? (
                <FormHelperText error>{errors.firstName}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl>
              <TextField label="Last Name" {...getFieldProps("lastName")} />
              {touched.lastName && errors.lastName ? (
                <FormHelperText error>{errors.lastName}</FormHelperText>
              ) : null}
            </FormControl>
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
            <FormControl variant="outlined">
              <InputLabel>Confirm Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                {...getFieldProps("confirmPassword")}
              />
              {touched.confirmPassword && errors.confirmPassword ? (
                <FormHelperText error>{errors.confirmPassword}</FormHelperText>
              ) : null}
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{
                marginTop: "0.5rem",
                padding: "0.75rem",
                boxShadow:
                  "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px 0px, rgba(0, 0, 0, 0.09) 0px 4px 2px 0px, rgba(0, 0, 0, 0.09) 0px 8px 4px 0px, rgba(0, 0, 0, 0.09) 0px 16px 8px 0px, rgba(0, 0, 0, 0.09) 0px 32px 16px 0px",
              }}
            >
              Register
            </Button>

            <Link to="/login">
              <Typography variant="subtitle1" color="green">
                Already registered? Sign in
              </Typography>
            </Link>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;

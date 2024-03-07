import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation, useQuery } from "react-query";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../lib/apis";
import $axios from "../lib/axios.instance";
import TodoDetailCard from "../components/TodoDetailCard";

const Home = () => {
  const navigate = useNavigate();

  const { isError, error, data } = useQuery({
    queryKey: ["get-details"],
    queryFn: async (values) => {
      return await $axios.get("/todo/details", values);
    },
  });
  const todoDetails = data?.data?.todoDetails;
  console.log(todoDetails);

  const { isLoading, mutate } = useMutation({
    mutationKey: ["add-todo"],
    mutationFn: addTodo,
    onSuccess: (response) => {
      navigate("/home");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Box sx={{ minWidth: "100vw", minHeight: "100vh", background: "#FFBE98" }}>
      <Box sx={{ marginTop: "10rem", marginLeft: "20rem" }}>
        <Formik
          initialValues={{
            courseName: "",
            studentName: "",
          }}
          validationSchema={Yup.object({
            courseName: Yup.string()
              .required("course name is required.")
              .trim()
              .max(40, "course name must be at max 40 character"),
            studentName: Yup.string()
              .required("description is required")
              .trim()
              .max(40, "description must be at max 40 character."),
          })}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {({ handleSubmit, getFieldProps, errors, touched }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                minHeight: "50px",
                width: "800px",
                display: "flex",
                padding: "2rem",
                borderRadius: "3rem",
                alignItems: "center",
                textAlign: "center",
                gap: "1rem",
                marginLeft: "3rem",
                marginTop: "1rem",
                boxShadow:
                  "0 20px 40px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Add Todo
              </Typography>
              <FormControl>
                <TextField
                  label="Course Name"
                  {...getFieldProps("courseName")}
                />
                {touched.courseName && errors.courseName ? (
                  <FormHelperText error>{errors.courseName}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl>
                <TextField
                  label="Student Name"
                  {...getFieldProps("studentName")}
                />
                {touched.studentName && errors.studentName ? (
                  <FormHelperText error>{errors.studentName}</FormHelperText>
                ) : null}
              </FormControl>
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{
                  marginLeft: "2rem",
                  boxShadow:
                    "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px 0px, rgba(0, 0, 0, 0.09) 0px 4px 2px 0px, rgba(0, 0, 0, 0.09) 0px 8px 4px 0px, rgba(0, 0, 0, 0.09) 0px 16px 8px 0px, rgba(0, 0, 0, 0.09) 0px 32px 16px 0px",
                }}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
      <Box sx={{ marginTop: "5rem" }}>
        {todoDetails &&
          todoDetails.map((item) => {
            return <TodoDetailCard key={item._id} {...item} />;
          })}
      </Box>
    </Box>
  );
};

export default Home;

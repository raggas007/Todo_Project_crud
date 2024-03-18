import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation, useQuery } from "react-query";
import * as Yup from "yup";
import $axios from "../lib/axios.instance";
import { useNavigate, useParams } from "react-router-dom";

const EditTodo = () => {
  const navigate = useNavigate();

  const params = useParams();

  const todoId = params?.id;

  //get Todo details
  const {
    isLoading: getDetailsLoading,
    isError,
    error,
    data,
  } = useQuery({
    queryKey: ["get-todo-details-for-edit"],
    queryFn: async () => {
      return await $axios.get(`/todo/details/${todoId}`);
    },
  });
  const todoDetails = data?.data?.todoDetails;
  console.log(todoDetails);

  const { isLoading, mutate } = useMutation({
    mutationKey: ["edit-todo"],
    mutationFn: async (values) => {
      return await $axios.put(`/edit/todo/${todoId}`, values);
    },
    onSuccess: (response) => {
      navigate("/home");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  if (isLoading || getDetailsLoading) {
    return <CircularProgress />;
  }
  return (
    <Box sx={{ minWidth: "100vw", minHeight: "100vh", background: "#FFBE98" }}>
      <Box sx={{ marginTop: "10rem", marginLeft: "20rem" }}>
        <Formik
          enableReinitialize
          initialValues={{
            courseName: todoDetails?.courseName || "",
            studentName: todoDetails?.studentName || "",
            contactNumber: todoDetails?.contactNumber || "",
          }}
          validationSchema={Yup.object({
            courseName: Yup.string()
              .required("course name is required.")
              .trim()
              .max(40, "course name must be at max 40 character"),
            studentName: Yup.string()
              .required("Student Name is required")
              .trim()
              .max(40, "Student Name must be at max 40 character."),
            contactNumber: Yup.number().required("contact number is required"),
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
                Edit Todo
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
              <FormControl>
                <TextField
                  label="Contact Number"
                  type="number"
                  {...getFieldProps("contactNumber")}
                />
                {touched.contactNumber && errors.contactNumber ? (
                  <FormHelperText error>{errors.contactNumber}</FormHelperText>
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
    </Box>
  );
};

export default EditTodo;

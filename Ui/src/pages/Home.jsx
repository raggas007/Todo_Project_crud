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
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../lib/apis";
import $axios from "../lib/axios.instance";
import TodoDetailCard from "../components/TodoDetailCard";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Home = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: getTodoLoading,
    isError,
    error,
    data,
  } = useQuery({
    queryKey: ["get-details"],
    queryFn: async (values) => {
      return await $axios.get(`/todo/details`, values);
    },
  });
  const todoDetails = data?.data?.todoDetails;

  const { isLoading: addTodoLoading, mutate: addTodoMutate } = useMutation({
    mutationKey: ["add-todo"],
    mutationFn: addTodo,
    onSuccess: (response) => {
      queryClient.invalidateQueries("get-details");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
  const { isLoading: deleteTodoLoading, mutate: deleteTodoMutate } =
    useMutation({
      mutationKey: ["delete-todo"],
      mutationFn: async (_id) => {
        return await $axios.delete(`/delete/todo/${_id}`);
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries("get-details");
      },
      onError: (error) => {
        console.log(error?.response?.data?.message);
      },
    });
  if (addTodoLoading || getTodoLoading || deleteTodoLoading) {
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
            addTodoMutate(values);
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
        {todoDetails?.length === 0 ? (
          <Typography variant="h5" sx={{ color: "red" }}>
            No Todo records Available Here
          </Typography>
        ) : (
          todoDetails?.map((item) => {
            return (
              <Box key={item._id} sx={{ display: "flex" }}>
                <TodoDetailCard {...item} />

                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    height: "40px",
                  }}
                  startIcon={<DeleteOutlinedIcon />}
                  onClick={() => {
                    deleteTodoMutate(item?._id);
                  }}
                >
                  Delete
                </Button>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default Home;

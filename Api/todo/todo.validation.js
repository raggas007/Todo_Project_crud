import * as Yup from "yup";

export let todoValidationSchema = Yup.object({
  courseName: Yup.string()
    .required("course name is required.")
    .trim()
    .max(40, "course name must be at max 25 character"),
  studentName: Yup.string()
    .required("student name is required")
    .trim()
    .max(40, "student name must be at max 100 character."),
});

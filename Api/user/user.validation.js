import * as Yup from "yup";

export let userValidationSchema = Yup.object({
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
});

export let loginUserValidationSchema = Yup.object({
  email: Yup.string().email().required("email is required").trim().lowercase(),
  password: Yup.string().required("password is required").trim(),
});

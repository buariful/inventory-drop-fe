import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

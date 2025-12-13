import * as yup from "yup";

export const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .strict(true)
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters")
    .max(50, "Full Name cannot exceed 50 characters"),

  username: yup
    .string()
    .trim()
    .strict(true)
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters"),

  password: yup
    .string()
    .strict(true)
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(20, "Password cannot exceed 20 characters"),

  confirmPassword: yup
    .string()
    .strict(true)
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm Password is required"),
});

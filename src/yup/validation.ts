import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  // .matches(
  //   /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  //   "Email must be a valid email"
  // ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const signUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  // .matches(
  //   /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  //   "Email must be a valid email"
  // ),
  first_name: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z0-9]*$/, "First name can only have alphabets and digits"),
  last_name: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z0-9]*$/, "Last name can only have alphabets and digits"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const forgetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email must be a valid email"
    ),
});

export const resetPasswordSchema = yup.object().shape({
  resetCode: yup.string().required("Reset Code is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),

    confirmPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const composeMessageSchema = yup.object().shape({
  message: yup
    .string()
    .required("Message is required")
    .min(1, "Field is empty"),
  username: yup.array().of(yup.string()),
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Old Password is required"),

  newPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),

  confirmNewPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export const validateEmailSchema = yup.object().shape({
  code: yup
    .string()
    .required("Code is required")
    .matches(/^[0-9]+$/, "Code must contain only numbers")
    .max(6),
});

import * as Yup from "yup";

export const employeeSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Minimum 3 characters")
    .required("Full name is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of birth is required"),
  state: Yup.string().required("State is required"),
});

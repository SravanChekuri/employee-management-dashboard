import { useFormik } from "formik";
import { employeeSchema } from "../../utils/employeeSchema";
import { createEmptyEmployee } from "../../utils/employeeModel";
import { useEmployees } from "../../context/EmployeeContext";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUI } from "../../context/UIContext";

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, addEmployee, updateEmployee } = useEmployees();
  const { showLoading, hideLoading, showPopup } = useUI();

  const employeeToEdit = useMemo(() => {
    if (!id) return null;
    return employees.find((e) => String(e.id) === id);
  }, [id, employees]);

  const initialValues = useMemo(
    () => (employeeToEdit ? employeeToEdit : createEmptyEmployee()),
    [employeeToEdit],
  );

  const formik = useFormik({
    initialValues,
    validationSchema: employeeSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      showLoading(
        employeeToEdit ? "Updating employee..." : "Adding employee...",
      );

      setTimeout(() => {
        if (employeeToEdit) {
          updateEmployee(values);
          showPopup("success", "Employee updated successfully");
        } else {
          addEmployee(values);
          showPopup("success", "Employee added successfully");
        }

        hideLoading();
        navigate("/employees");
      }, 1000);
    },
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      formik.setFieldValue("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-gray-100 px-[5%] pt-6">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white w-full rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-6">
          {employeeToEdit ? "Edit Employee" : "Add Employee"}
        </h2>

        {/* GRID: 2 fields per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="text-sm font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="fullName"
              id="fullName"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.fullName}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="text-sm font-medium">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              id="gender"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.gender}
              </p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label htmlFor="dob" className="text-sm font-medium">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              id="dob"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dob && formik.errors.dob && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.dob}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="text-sm font-medium">
              State <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              id="state"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select State</option>
              <option>Telangana</option>
              <option>Andhra Pradesh</option>
              <option>Karnataka</option>
            </select>
            {formik.touched.state && formik.errors.state && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.state}</p>
            )}
          </div>
        </div>

        {/* Active + Image row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formik.values.active}
              onChange={(e) => formik.setFieldValue("active", e.target.checked)}
            />
            <span className="text-sm">Active</span>
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className="text-sm font-medium">
              Profile Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="block mt-2"
            />
            {formik.values.image && (
              <img
                src={formik.values.image}
                alt="preview"
                className="mt-3 w-24 h-24 rounded object-cover border"
              />
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            role="button"
            onClick={() => navigate("/employees")}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            role="button"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;

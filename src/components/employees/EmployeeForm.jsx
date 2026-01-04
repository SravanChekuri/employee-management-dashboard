import { useFormik } from "formik";
import { employeeSchema } from "../../utils/employeeSchema";
import { createEmptyEmployee } from "../../utils/employeeModel";
import { useEmployees } from "../../context/EmployeeContext";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({ editEmployee }) => {
  const { addEmployee, updateEmployee } = useEmployees();
  const navigate = useNavigate();

  const initialValues = useMemo(
    () => (editEmployee ? editEmployee : createEmptyEmployee()),
    [editEmployee]
  );

  const formik = useFormik({
    initialValues,
    validationSchema: employeeSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      editEmployee ? updateEmployee(values) : addEmployee(values);
      navigate("/employees");
    },
  });

  const handleCancel = () => {
    navigate("/employees");
  };

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
          {editEmployee ? "Edit Employee" : "Add Employee"}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              name="fullName"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
            {formik.errors.fullName && (
              <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              name="gender"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={formik.values.dob}
              onChange={formik.handleChange}
            />
          </div>

          {/* State */}
          <div>
            <label className="text-sm font-medium">State</label>
            <select
              name="state"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={formik.values.state}
              onChange={formik.handleChange}
            >
              <option value="">Select State</option>
              <option>Telangana</option>
              <option>Andhra Pradesh</option>
              <option>Karnataka</option>
            </select>
          </div>
        </div>

        {/* Active */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            checked={formik.values.active}
            onChange={(e) => formik.setFieldValue("active", e.target.checked)}
          />
          <span className="text-sm">Active</span>
        </div>

        {/* Image */}
        <div className="mt-4">
          <label className="text-sm font-medium">Profile Image</label>
          <input
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

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
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

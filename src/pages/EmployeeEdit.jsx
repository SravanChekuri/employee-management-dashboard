import { useParams, useNavigate } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";
import EmployeeForm from "../components/employees/EmployeeForm";

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees } = useEmployees();

  const employee = employees.find((e) => e.id === Number(id));

  if (!employee) {
    return <p className="p-4">Employee not found</p>;
  }

  return (
    <div className="pt-4 p-3">
      <h2 className="text-lg font-semibold mb-4">Edit Employee</h2>
      <EmployeeForm
        editEmployee={employee}
        onClose={() => navigate("/employees")}
      />
    </div>
  );
};

export default EmployeeEdit;

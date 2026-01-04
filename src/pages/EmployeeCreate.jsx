import EmployeeForm from "../components/employees/EmployeeForm";
import { useNavigate } from "react-router-dom";

const EmployeeCreate = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-4 p-3">
      <h2 className="text-lg font-semibold mb-4">Create Employee</h2>
      <EmployeeForm onClose={() => navigate("/employees")} />
    </div>
  );
};

export default EmployeeCreate;

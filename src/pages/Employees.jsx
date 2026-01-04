import EmployeeList from "./../components/employees/EmployeeList";

const Employees = () => {
  return (
    <div className="pt-4 p-3">
      <h2 className="text-lg font-semibold mb-4">Manage Employees</h2>
      <EmployeeList />
    </div>
  );
};

export default Employees;

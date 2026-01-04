import { useEmployees } from "../context/EmployeeContext";

const Dashboard = () => {
  const { employees } = useEmployees();

  const active = employees.filter((e) => e.active).length;

  return (
    <div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Employee Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            Total Employees
            <p className="text-2xl font-bold">{employees.length}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            Active Employees
            <p className="text-2xl font-bold text-green-600">{active}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            Inactive Employees
            <p className="text-2xl font-bold text-red-600">
              {employees.length - active}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState, useMemo } from "react";
import { useEmployees } from "../../context/EmployeeContext";
import EmployeeTable from "./EmployeeTable";
import EmployeeFilters from "./EmployeeFilters";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const navigate = useNavigate();
  const { employees = [], deleteEmployee } = useEmployees();
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const filteredEmployees = useMemo(() => {
    return employees.filter((e) => {
      const matchesSearch = e.fullName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesGender = gender ? e.gender === gender : true;

      const matchesStatus =
        status === "" ? true : status === "active" ? e.active : !e.active;

      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, search, gender, status]);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmed) {
      deleteEmployee(id);
    }
  };

  const handlePrint = () => {
    const win = window.open("", "_blank");

    const rows = filteredEmployees
      .map(
        (e) => `
        <tr>
          <td>${e.id}</td>
          <td>${e.fullName}</td>
          <td>${e.gender}</td>
          <td>${e.dob}</td>
          <td>${e.state}</td>
          <td>${e.active ? "Active" : "Inactive"}</td>
        </tr>
      `
      )
      .join("");

    win.document.write(`
    <html>
      <head>
        <title>Employee List</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ccc; padding: 8px; }
          th { background: #f3f4f6; }
        </style>
      </head>
      <body>
        <h2>Employee List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>State</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows || `<tr><td colspan="6">No data</td></tr>`}
          </tbody>
        </table>
      </body>
    </html>
  `);

    win.document.close();
    win.print();
  };

  return (
    <div className="space-y-4">
      <EmployeeFilters
        search={search}
        gender={gender}
        status={status}
        onSearchChange={setSearch}
        onGenderChange={setGender}
        onStatusChange={setStatus}
        onCreate={() => navigate("/employees/new")}
        onPrint={handlePrint}
      />

      <EmployeeTable
        employees={filteredEmployees}
        onEdit={(e) => navigate(`/employees/${e.id}/edit`)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EmployeeList;

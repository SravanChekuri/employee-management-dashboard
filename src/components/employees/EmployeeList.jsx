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

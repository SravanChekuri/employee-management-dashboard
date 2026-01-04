import { useState, useMemo } from "react";
import { useEmployees } from "../../context/EmployeeContext";
import EmployeeTable from "./EmployeeTable";
import EmployeeFilters from "./EmployeeFilters";
import { useNavigate } from "react-router-dom";
import { printEmployees } from "../../utils/printEmployees";
import Pagination from "../common/Pagination";

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

  const handlePrint = () => {
    printEmployees(filteredEmployees);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmed) {
      deleteEmployee(id);
    }
  };

  const PAGE_SIZE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredEmployees.length / PAGE_SIZE);

  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredEmployees.slice(start, start + PAGE_SIZE);
  }, [filteredEmployees, currentPage]);

  return (
    <div className="space-y-4">
      <EmployeeFilters
        search={search}
        gender={gender}
        status={status}
        onSearchChange={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        onGenderChange={(v) => {
          setGender(v);
          setCurrentPage(1);
        }}
        onStatusChange={(v) => {
          setStatus(v);
          setCurrentPage(1);
        }}
        onCreate={() => navigate("/employees/new")}
        onPrint={handlePrint}
      />

      <EmployeeTable
        employees={paginatedEmployees}
        onEdit={(e) => navigate(`/employees/${e.id}/edit`)}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default EmployeeList;

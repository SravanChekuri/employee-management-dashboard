import { createContext, useContext, useState, useEffect } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const data = localStorage.getItem("employees");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (emp) => setEmployees((prev) => [...prev, emp]);

  const updateEmployee = (emp) =>
    setEmployees((prev) => prev.map((e) => (e.id === emp.id ? emp : e)));

  const deleteEmployee = (id) =>
    setEmployees((prev) => prev.filter((e) => e.id !== id));

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const useEmployees = () => useContext(EmployeeContext);

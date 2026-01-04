import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EmployeeList from "../EmployeeList";
import { printEmployees } from "../../../utils/printEmployees";

const mockDeleteEmployee = vi.fn();

vi.mock("../../../context/EmployeeContext", () => ({
  useEmployees: () => ({
    employees: [
      {
        id: 1,
        fullName: "John Doe",
        gender: "Male",
        dob: "1995-01-01",
        state: "Telangana",
        active: true,
      },
      {
        id: 2,
        fullName: "Jane Smith",
        gender: "Female",
        dob: "1998-05-10",
        state: "Karnataka",
        active: false,
      },
    ],
    deleteEmployee: mockDeleteEmployee,
  }),
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../EmployeeTable", () => ({
  default: ({ employees, onEdit, onDelete }) => (
    <div data-testid="employee-table">
      {employees.map((e) => (
        <div key={e.id}>
          <span>{e.fullName}</span>
          <button onClick={() => onEdit(e)}>Edit</button>
          <button onClick={() => onDelete(e.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../EmployeeFilters", () => ({
  default: ({ onSearchChange, onCreate, onPrint }) => (
    <div>
      <button onClick={() => onSearchChange("john")}>Search John</button>
      <button onClick={onCreate}>Create</button>
      <button onClick={onPrint}>Print</button>
    </div>
  ),
}));

vi.mock("../../common/Pagination", () => ({
  default: () => <div data-testid="pagination" />,
}));

vi.mock("../../../utils/printEmployees", () => ({
  printEmployees: vi.fn(),
}));

describe("EmployeeList", () => {
  it("renders employee table and pagination", () => {
    render(<EmployeeList />);

    expect(screen.getByTestId("employee-table")).toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});

it("filters employees by search", () => {
  render(<EmployeeList />);

  fireEvent.click(screen.getByText("Search John"));

  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
});

it("navigates to create employee page", () => {
  render(<EmployeeList />);

  fireEvent.click(screen.getByText("Create"));

  expect(mockNavigate).toHaveBeenCalledWith("/employees/new");
});

it("navigates to edit employee page", () => {
  render(<EmployeeList />);

  fireEvent.click(screen.getAllByText("Edit")[0]);

  expect(mockNavigate).toHaveBeenCalledWith("/employees/1/edit");
});

it("deletes employee after confirmation", () => {
  vi.spyOn(window, "confirm").mockReturnValue(true);

  render(<EmployeeList />);

  fireEvent.click(screen.getAllByText("Delete")[0]);

  expect(mockDeleteEmployee).toHaveBeenCalledWith(1);
});

it("prints filtered employees", () => {
  render(<EmployeeList />);

  fireEvent.click(screen.getByText("Search John"));
  fireEvent.click(screen.getByText("Print"));

  expect(printEmployees).toHaveBeenCalledWith([
    expect.objectContaining({ fullName: "John Doe" }),
  ]);
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EmployeeForm from "../EmployeeForm";

/* ------------------ mocks ------------------ */

const mockNavigate = vi.fn();
const mockAddEmployee = vi.fn();
const mockUpdateEmployee = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({}), // add mode
  };
});

vi.mock("../../../context/EmployeeContext", () => ({
  useEmployees: () => ({
    employees: [],
    addEmployee: mockAddEmployee,
    updateEmployee: mockUpdateEmployee,
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

/* ------------------ helpers ------------------ */

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { value: "John Doe" },
  });

  fireEvent.change(screen.getByLabelText(/gender/i), {
    target: { value: "Male" },
  });

  fireEvent.change(screen.getByLabelText(/date of birth/i), {
    target: { value: "1995-01-01" },
  });

  fireEvent.change(screen.getByLabelText(/state/i), {
    target: { value: "Telangana" },
  });
};

/* ------------------ tests ------------------ */

describe("EmployeeForm", () => {
  it("renders Add Employee form", () => {
    render(<EmployeeForm />);

    expect(
      screen.getByRole("heading", { name: /add employee/i })
    ).toBeInTheDocument();
  });

  it("calls addEmployee on valid submit", async () => {
    render(<EmployeeForm />);

    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(mockAddEmployee).toHaveBeenCalledTimes(1);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/employees");
  });

  it("shows validation error when required fields are empty", async () => {
    render(<EmployeeForm />);

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(await screen.findByText(/full name/i)).toBeInTheDocument();
  });
});

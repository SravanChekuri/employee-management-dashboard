import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EmployeeCreate from "../EmployeeCreate";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../components/employees/EmployeeForm", () => ({
  default: ({ onClose }) => (
    <div data-testid="employee-form">
      <button onClick={onClose}>Mock Close</button>
    </div>
  ),
}));

describe("EmployeeCreate page", () => {
  it("renders Create Employee heading", () => {
    render(<EmployeeCreate />);

    expect(
      screen.getByRole("heading", { name: /create employee/i })
    ).toBeInTheDocument();
  });

  it("renders EmployeeForm component", () => {
    render(<EmployeeCreate />);

    expect(screen.getByTestId("employee-form")).toBeInTheDocument();
  });

  it("navigates back to employees page when form closes", () => {
    render(<EmployeeCreate />);

    screen.getByText("Mock Close").click();

    expect(mockNavigate).toHaveBeenCalledWith("/employees");
  });
});

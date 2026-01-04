import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Employees from "../Employees";

vi.mock("../../components/employees/EmployeeList", () => ({
  default: () => <div data-testid="employee-list" />,
}));

describe("Employees page", () => {
  it("renders the Manage Employees heading", () => {
    render(<Employees />);

    expect(
      screen.getByRole("heading", { name: /manage employees/i })
    ).toBeInTheDocument();
  });

  it("renders EmployeeList component", () => {
    render(<Employees />);

    expect(screen.getByTestId("employee-list")).toBeInTheDocument();
  });
});

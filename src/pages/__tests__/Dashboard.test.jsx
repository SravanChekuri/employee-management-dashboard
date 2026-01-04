import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import Dashboard from "../Dashboard";

vi.mock("../../context/EmployeeContext", () => ({
  useEmployees: () => ({
    employees: [
      { id: 1, active: true },
      { id: 2, active: true },
      { id: 3, active: false },
    ],
  }),
}));

test("renders dashboard heading", () => {
  render(<Dashboard />);

  expect(screen.getByText(/employee overview/i)).toBeInTheDocument();
});

test("shows total employees count", () => {
  render(<Dashboard />);

  expect(screen.getByText("3")).toBeInTheDocument();
});

test("shows active employees count", () => {
  render(<Dashboard />);

  expect(screen.getByText("2")).toBeInTheDocument();
});

test("shows inactive employees count", () => {
  render(<Dashboard />);

  expect(screen.getByText("1")).toBeInTheDocument();
});

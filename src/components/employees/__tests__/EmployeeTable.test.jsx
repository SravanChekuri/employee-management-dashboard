import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EmployeeTable from "../EmployeeTable";

describe("EmployeeTable", () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  const mockEmployees = [
    {
      id: 1,
      fullName: "John Doe",
      gender: "Male",
      dob: "1995-01-01",
      state: "Telangana",
      active: true,
      image: "",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      gender: "Female",
      dob: "1998-05-10",
      state: "Karnataka",
      active: false,
      image: "",
    },
  ];

  it("renders table headers", () => {
    render(
      <EmployeeTable
        employees={mockEmployees}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("DOB")).toBeInTheDocument();
    expect(screen.getByText("State")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders employee rows correctly", () => {
    render(
      <EmployeeTable
        employees={mockEmployees}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
  });

  it("shows Active and Inactive status correctly", () => {
    render(
      <EmployeeTable
        employees={mockEmployees}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  it("calls onEdit with correct employee when Edit is clicked", () => {
    render(
      <EmployeeTable
        employees={mockEmployees}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it("calls onDelete with correct id when Delete is clicked", () => {
    render(
      <EmployeeTable
        employees={mockEmployees}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[1]);

    expect(mockOnDelete).toHaveBeenCalledWith(2);
  });

  it("shows empty state when no employees exist", () => {
    render(
      <EmployeeTable
        employees={[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(/no employees found/i)).toBeInTheDocument();
  });
});

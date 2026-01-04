import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EmployeeFilters from "../EmployeeFilters";

describe("EmployeeFilters", () => {
  const defaultProps = {
    search: "",
    gender: "",
    status: "",
    onSearchChange: vi.fn(),
    onGenderChange: vi.fn(),
    onStatusChange: vi.fn(),
    onCreate: vi.fn(),
    onPrint: vi.fn(),
  };

  it("renders all filter inputs and buttons", () => {
    render(<EmployeeFilters {...defaultProps} />);

    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();

    expect(screen.getByText(/all genders/i)).toBeInTheDocument();
    expect(screen.getByText(/all status/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /print results/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /\+ create employee/i })
    ).toBeInTheDocument();
  });

  it("calls onSearchChange when typing in search input", () => {
    render(<EmployeeFilters {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(/search by name/i);

    fireEvent.change(searchInput, { target: { value: "john" } });

    expect(defaultProps.onSearchChange).toHaveBeenCalledWith("john");
  });

  it("calls onGenderChange when gender is selected", () => {
    render(<EmployeeFilters {...defaultProps} />);

    const genderSelect = screen.getByDisplayValue(/all genders/i);

    fireEvent.change(genderSelect, { target: { value: "Male" } });

    expect(defaultProps.onGenderChange).toHaveBeenCalledWith("Male");
  });

  it("calls onStatusChange when status is selected", () => {
    render(<EmployeeFilters {...defaultProps} />);

    const statusSelect = screen.getByDisplayValue(/all status/i);

    fireEvent.change(statusSelect, { target: { value: "active" } });

    expect(defaultProps.onStatusChange).toHaveBeenCalledWith("active");
  });

  it("calls onPrint when Print Results button is clicked", () => {
    render(<EmployeeFilters {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: /print results/i }));

    expect(defaultProps.onPrint).toHaveBeenCalledTimes(1);
  });

  it("calls onCreate when Create Employee button is clicked", () => {
    render(<EmployeeFilters {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", { name: /\+ create employee/i })
    );

    expect(defaultProps.onCreate).toHaveBeenCalledTimes(1);
  });
});

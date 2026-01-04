import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EmployeeEdit from "../EmployeeEdit";

const mockNavigate = vi.fn();
const mockUseParams = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockUseParams(),
  };
});

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
];

vi.mock("../../context/EmployeeContext", () => ({
  useEmployees: () => ({
    employees: mockEmployees,
  }),
}));

vi.mock("../../components/employees/EmployeeForm", () => ({
  default: ({ onClose }) => (
    <div data-testid="employee-form">
      <button onClick={onClose}>Mock Close</button>
    </div>
  ),
}));

describe("EmployeeEdit page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders edit form when employee exists", () => {
    mockUseParams.mockReturnValue({ id: "1" });

    render(<EmployeeEdit />);

    expect(
      screen.getByRole("heading", { name: /edit employee/i })
    ).toBeInTheDocument();

    expect(screen.getByTestId("employee-form")).toBeInTheDocument();
  });

  it("navigates back to employees page when form closes", () => {
    mockUseParams.mockReturnValue({ id: "1" });

    render(<EmployeeEdit />);

    screen.getByText("Mock Close").click();

    expect(mockNavigate).toHaveBeenCalledWith("/employees");
  });

  it("shows not found message when employee does not exist", () => {
    mockUseParams.mockReturnValue({ id: "999" });

    render(<EmployeeEdit />);

    expect(screen.getByText(/employee not found/i)).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi, beforeEach } from "vitest";
import Navbar from "../Navbar";

// ---- mocks ----
const mockNavigate = vi.fn();
const mockLogout = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../../context/AuthContext", () => ({
  useAuth: () => ({
    logout: mockLogout,
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------- TESTS ----------------

test("renders company logo and title", () => {
  render(<Navbar />);

  expect(screen.getByText(/xyz hr management/i)).toBeInTheDocument();

  expect(screen.getByAltText(/company logo/i)).toBeInTheDocument();
});

test("renders desktop navigation items", () => {
  render(<Navbar />);

  expect(
    screen.getByRole("button", { name: /dashboard/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /manage employees/i })
  ).toBeInTheDocument();
});

test("renders user email and logout button", () => {
  render(<Navbar />);

  expect(screen.getAllByText("admin@test.com").length).toBeGreaterThan(0);

  expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
});

test("logs out and navigates to login on logout click", () => {
  render(<Navbar />);

  fireEvent.click(screen.getByRole("button", { name: /logout/i }));

  expect(mockLogout).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
});

test("navigates to dashboard when dashboard button clicked", () => {
  render(<Navbar />);

  fireEvent.click(screen.getByRole("button", { name: /dashboard/i }));

  expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
});

test("navigates to employees page when manage employees clicked", () => {
  render(<Navbar />);

  fireEvent.click(screen.getByRole("button", { name: /manage employees/i }));

  expect(mockNavigate).toHaveBeenCalledWith("/employees");
});

test("opens and closes mobile menu using hamburger icon", () => {
  render(<Navbar />);

  const hamburger = screen.getByText("☰");

  fireEvent.click(hamburger);

  expect(screen.getAllByText("admin@test.com").length).toBeGreaterThan(1);

  fireEvent.click(screen.getAllByText(/dashboard/i)[1]);

  expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
});

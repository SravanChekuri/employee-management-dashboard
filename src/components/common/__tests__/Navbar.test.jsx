import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi, beforeEach } from "vitest";
import Navbar from "../Navbar";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockLogout = vi.fn();

vi.mock("../../../context/AuthContext", () => ({
  useAuth: () => ({
    logout: mockLogout,
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

test("renders company logo and title", () => {
  render(<Navbar />);

  expect(screen.getByText(/xyz hr management/i)).toBeInTheDocument();

  expect(screen.getByAltText(/company logo/i)).toBeInTheDocument();
});

test("shows user email and logout button", () => {
  render(<Navbar />);

  expect(screen.getByText("admin@test.com")).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
});

test("logs out and navigates to login on logout click", () => {
  render(<Navbar />);

  const logoutButton = screen.getByRole("button", {
    name: /logout/i,
  });

  fireEvent.click(logoutButton);

  expect(mockLogout).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
});

test("toggles mobile menu on hamburger click", () => {
  render(<Navbar />);

  const hamburger = screen.getByText("☰");

  // Menu closed initially
  expect(screen.queryByText("admin@test.com")).toBeInTheDocument(); // desktop

  fireEvent.click(hamburger);

  // Mobile menu opens
  expect(screen.getAllByText("admin@test.com").length).toBeGreaterThan(1);
});

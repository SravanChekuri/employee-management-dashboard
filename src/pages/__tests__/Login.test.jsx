import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Login from "../Login";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import userEvent from "@testing-library/user-event";

const renderLogin = () => {
  return render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  );
};

test("renders login page", () => {
  renderLogin();

  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test("shows validation errors when fields are empty", async () => {
  renderLogin();

  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(screen.getByText("*Email is required")).toBeInTheDocument();
  expect(screen.getByText("*Password is required")).toBeInTheDocument();
});

test("shows error for invalid credentials", async () => {
  renderLogin();

  await userEvent.type(screen.getByLabelText(/email/i), "wrong@test.com");
  await userEvent.type(screen.getByLabelText(/password/i), "wrong123");
  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(screen.getByText("*Invalid email or password")).toBeInTheDocument();
});

test("logs in and navigates to dashboard with valid credentials", async () => {
  renderLogin();

  await userEvent.type(screen.getByLabelText(/email/i), "admin@test.com");
  await userEvent.type(screen.getByLabelText(/password/i), "admin123");
  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(window.location.pathname).toBe("/dashboard");
});

test("redirects to dashboard if already authenticated", () => {
  localStorage.setItem("auth", "true");

  renderLogin();

  expect(window.location.pathname).toBe("/dashboard");

  localStorage.removeItem("auth");
});

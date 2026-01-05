# Employee Management Dashboard

## Project Overview

The Employee Management Dashboard is a modern, responsive web application built using React.js that allows users to authenticate and manage employee data efficiently. The application supports adding, editing, deleting, searching, filtering, and printing employee records, along with image upload and status management.

This project was developed following real-world frontend engineering practices, including clean architecture, reusable components, robust form validation, CI/CD pipelines, and cloud deployment.

---

## Key Features

### Authentication

- Mock login system
- Protected routes using React Router
- Authentication state persisted in localStorage

### Dashboard

- Total employee count
- Active vs Inactive employee summary
- Responsive layout for all screen sizes

### Employee Management

- Add employee
- Edit employee (reusing the same form)
- Delete employee with confirmation
- Upload profile image with preview

### Search & Filter

- Search employees by name
- Filter by gender
- Filter by active/inactive status
- Combined filtering logic

### Additional Features

- Print employee list
- Graceful empty states
- Mobile-first responsive UI

---

## Tech Stack

### Frontend

- React 18 (Functional components & Hooks)
- React Router v6 (Routing & protected routes)
- Context API (Global state management)
- Formik (Form handling)
- Yup (Form validation)
- Tailwind CSS (Responsive UI styling)

### Tooling & DevOps

- Vite (Modern build tool)
- Git & GitHub (Version control)
- GitHub Actions (CI/CD)
- Vercel (Deployment & hosting)

---

## Architectural Decisions

- `pages/` → Route-level containers (screens)
- `components/` → Reusable UI elements
- `context/` → Centralized state management
- `utils/` → Business logic & helpers

This separation improves scalability, readability, and testability.

---

## Form Handling & Validation

- Forms are implemented using Formik to manage state and submission logic.
- Validation rules are centralized using Yup, ensuring consistency and cleaner components.
- The same employee form is reused for both Add and Edit operations.

---

## UI & Responsiveness

- Built using Tailwind CSS
- Mobile-first design approach
- Responsive grids and layouts for small, medium, and large screens
- Consistent spacing, typography, and color palette

---

## State Management

- AuthContext handles authentication state.
- EmployeeContext manages employee CRUD operations.
- Data persistence achieved using localStorage as a mock backend.

This approach avoids unnecessary complexity (e.g., Redux) while remaining scalable.

---

## CI/CD & Deployment

### Continuous Integration

- Configured using GitHub Actions
- Automatically triggers build and deployment on every push to the main branch

### Deployment

- Hosted on Vercel
- Automatic deployments from GitHub repository
- Public URL available for live demo:  
  https://employee-management-dashboard-woad.vercel.app

---

## Assumptions & Design Decisions

- Backend is mocked using localStorage
- Authentication is simplified for demonstration purposes
- Focus is placed on frontend architecture, code quality, and UX
- Redux was intentionally avoided to keep the solution lightweight

---

## How to Run the Project Locally

```bash
# Clone the repository
git clone <your-github-repo-url>

# Navigate to the project directory
cd employee-management-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

#### The application will be available at: http://localhost:5173

## Screen Recording

🎥 Screen Recording Link: https://github.com/user-attachments/assets/17bfc503-ee58-4003-b07a-8412773d7a25

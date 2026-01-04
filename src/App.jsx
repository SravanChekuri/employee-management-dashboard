import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";

function App() {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </EmployeeProvider>
    </AuthProvider>
  );
}

export default App;

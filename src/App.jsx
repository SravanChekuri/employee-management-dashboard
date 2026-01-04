import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import { UIProvider } from "./context/UIContext";
import LoadingOverlay from "./components/common/LoadingOverlay";
import Popup from "./components/common/Popup";

function App() {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <UIProvider>
          <BrowserRouter>
            <LoadingOverlay />
            <Popup />
            <AppRoutes />
          </BrowserRouter>
        </UIProvider>
      </EmployeeProvider>
    </AuthProvider>
  );
}

export default App;

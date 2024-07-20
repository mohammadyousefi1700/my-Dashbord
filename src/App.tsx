import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginAndSignUp";
import { AuthProvider } from "./utils/AutContext";
import PrivateRoute from "components/PrivateRoute";
import ErrorBoundary from "components/ErrorBoundray";
import "react-toastify/dist/ReactToastify.css";
import ToastifyContainer from "components/Notification&Toastify/Toastify";
import Dashboard from "./pages/dashbord";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <ToastifyContainer />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/*" element={<Dashboard />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginAndSignUp";
import Dashboard from "./pages/dashbord";
import { AuthProvider } from "./utils/AutContext";
import PrivateRoute from "components/PrivateRoute";
import ErrorBoundary from "components/ErrorBoundray";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              {/* ))  } */}
              <Route path="/*" element={<Dashboard />} />{" "}
            </Route>

            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

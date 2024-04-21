import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginAndSignUp";
import Dashboard from "./pages/dashbord";
import { AuthProvider, useLoggedInUser } from "./utils/AutContext";
import PrivateRoute from "components/PrivateRoute";
import ErrorBoundary from "components/ErrorBoundray";

function App() {
  return (
    <ErrorBoundary>
      <div className="">
        <Router>
          <AuthProvider>
            <Routes>
              {/* {Root.map((item) => (
                <>
                  <Route element={<PrivateRoute />}>
                    <Route {...item} />
                  </Route>
                </>
              ))} */}
              <Route element={<PrivateRoute />}>
                {/* ))  } */}
                <Route path="/*" element={<Dashboard />} />{" "}
              </Route>

              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;

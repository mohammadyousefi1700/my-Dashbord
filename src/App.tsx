import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginAndSignUp";
import Dashboard from "./pages/dashbord";
import { AuthProvider, useLoggedInUser } from "./utils/AutContext";
import PrivateRoute from "components/PrivateRoute";
import ErrorBoundary from "components/ErrorBoundray";
import { Root } from "pages/root";
// import LoadingLogin from "components/Loading";

function App() {
  return (
    <ErrorBoundary>
      <div className="w-full h-full">
        <Router>
          <AuthProvider>
            <Routes>
              <Route element={<PrivateRoute />}>
                {Root.map((item, key) => (
                  <Route key={key} {...item} />
                ))}
                {/* <Route path="/" element={<Dashboard />} /> */}
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

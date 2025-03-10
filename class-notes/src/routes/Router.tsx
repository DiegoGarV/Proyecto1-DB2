import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import LoginScreen from "../screens/LoginScreen";

const isAuthenticated = !!localStorage.getItem("user_id");

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
      />
    </Routes>
  </Router>
);

export default AppRouter;

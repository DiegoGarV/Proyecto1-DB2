import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import RegisterScreen from "../screens/LoginScreen";
import SavedPosts from "../screens/SavedPosts";
import CreatePost from "../screens/CreatePost";

const AppRouter: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user_id")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("user_id"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<RegisterScreen />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
        />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/saved-posts" element={<SavedPosts />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

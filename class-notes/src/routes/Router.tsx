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
import SavedPosts from "../screens/SavedPosts";
import CreatePost from "../screens/CreatePost";

// const isAuthenticated = !!localStorage.getItem("user_id");
const isAuthenticated = true;

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
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/saved-posts" element={<SavedPosts />} />
    </Routes>
  </Router>
);

export default AppRouter;

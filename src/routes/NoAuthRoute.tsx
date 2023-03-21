import React from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";

const NoAuthRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default NoAuthRoute;

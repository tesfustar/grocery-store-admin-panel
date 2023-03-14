import React from "react";
import { Routes, Route } from "react-router-dom";

const Login = React.lazy(() => import("../pages/auth/Login"));
const ForgotPassword = React.lazy(() => import("../pages/auth/ForgotPassword"));
const NoAuthRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default NoAuthRoute;

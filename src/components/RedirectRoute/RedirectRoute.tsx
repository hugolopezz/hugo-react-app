import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("idUser");
  return !!token && !!userId;
};

interface RedirectRouteProps {
  element: React.ReactNode;
  isProtected: boolean;
}

const RedirectRoute: React.FC<RedirectRouteProps> = ({ element, isProtected }) => {
  const authenticated = isAuthenticated();
  return authenticated === isProtected ? element : <Navigate to={isProtected ? "/" : "/dashboard"} />;
};

export default RedirectRoute;

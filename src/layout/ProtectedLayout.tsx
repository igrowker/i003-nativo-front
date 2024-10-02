import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import AuthGuard from "../components/AuthGuard";

const ProtectedLayout: React.FC = () => {
  // Verificar si el token sigue siendo válido y redirigir al login si no lo es
  const isTokenValid = useUserStore((state) => state.isTokenValid);
  if (!isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
};

export default ProtectedLayout;

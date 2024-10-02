import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isTokenValid = useUserStore((state) => state.isTokenValid);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  // Verificar si el token sigue siendo válido y redirigir al login si no lo es
  const checkTokenValidity = useCallback(() => {
    if (!isTokenValid()) {
      clearUser();
      navigate("/login", { replace: true });
    }
  }, [isTokenValid, clearUser, navigate]);

  useEffect(() => {
    checkTokenValidity();

    // Verificar cada minuto si el token sigue siendo válido
    const intervalId = setInterval(checkTokenValidity, 60000);

    // Verificar cuando la app vuelve a primer plano
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        checkTokenValidity();
      }
    });

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", checkTokenValidity);
    };
  }, [checkTokenValidity]);

  return <>{children}</>;
};

export default AuthGuard;

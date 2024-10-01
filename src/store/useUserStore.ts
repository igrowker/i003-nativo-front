import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  birthday: string;
  dni: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  tokenExpiration: number | null;
  verificationCode: string | null;
}

interface UserActions {
  setUser: (userData: User) => void;
  setToken: (token: string, expiresIn: number) => void;
  clearUser: () => void;
  isTokenValid: () => boolean;
  setVerificationCode: (code: string) => void;
  clearVerificationCode: () => void;
  verifyCode: (inputCode: string) => Promise<boolean>; // Nueva acción para verificar el código
}

type UserStore = UserState & UserActions;

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      tokenExpiration: null,
      verificationCode: null,
      setUser: (userData) => set({ user: userData }),
      setToken: (token, expiresIn) => {
        const expirationTime = new Date().getTime() + expiresIn;
        set({ token, tokenExpiration: expirationTime });
      },
      clearUser: () => set({ user: null, token: null, tokenExpiration: null }),
      isTokenValid: () => {
        const state = get();
        if (!state.token || !state.tokenExpiration) return false;
        return new Date().getTime() < state.tokenExpiration;
      },
      setVerificationCode: (code) => set({ verificationCode: code }),
      clearVerificationCode: () => set({ verificationCode: null }),
      verifyCode: async (inputCode) => {
        const state = get();
        try {
          const response = await fetch(
            "https://i003-nativo-back-production.up.railway.app/api/autenticacion/inicio-sesion",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: state.user?.email, // Envía el email del usuario
                verificationCode: inputCode, // El código ingresado
              }),
            },
          );
          console.log(response);
          if (response.status === 200) {
            // Verificación exitosa
            return true;
          } else {
            // Error en la verificación
            return false;
          }
        } catch (error) {
          console.error("Error en la verificación del código:", error);
          return false;
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        tokenExpiration: state.tokenExpiration,
      }),
    },
  ),
);

export default useUserStore;

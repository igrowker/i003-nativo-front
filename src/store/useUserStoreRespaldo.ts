// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import { getHistoryMicrocreditsService } from "../services/getHistoryMicrocreditsService";
// import { getMicrocreditsByIdService } from "../services/getMicrocreditsByIdService";

// interface User {
//   id: string;
//   email: string;
//   name: string;
//   surname: string;
//   phone: string;
//   birthday: string;
//   dni: string;
//   accountId?: string;
// }


// interface Contribution {
//   id: string;
//   lenderAccountId: string;
//   lenderFullname: string;
//   borrowerFullname: string;
//   microcreditId: string;
//   amount: number;
//   createdDate: string;
//   expiredDateMicrocredit: string;
//   transactionStatus: string;
// }

// interface Microcredit {
//   id: string;
//   borrowerAccountId: string;
//   amount: number;
//   remainingAmount: number;
//   createdDate: string;
//   expirationDate: string;
//   title: string;
//   description: string;
//   transactionStatus: string;
//   contributions: Contribution[];
// }

// interface UserState {
//   user: User | null;
//   token: string | null;
//   tokenExpiration: number | null;
//   verificationCode: string | null;
//   microcreditsList: any[];
// }

// interface UserActions {
//   setUser: (userData: User) => void;
//   setToken: (token: string, expiresIn: number) => void;
//   clearUser: () => void;
//   isTokenValid: () => boolean;
//   setVerificationCode: (code: string) => void;
//   clearVerificationCode: () => void;
//   verifyCode: (inputCode: string) => Promise<boolean>; // Nueva acción para verificar el código
//   loginUser: (email: string, password: string) => Promise<boolean>;
//   setMicrocreditsList: () => void;
// }

// type UserStore = UserState & UserActions;

// const useUserStore = create<UserStore>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       token: null,
//       tokenExpiration: null,
//       verificationCode: null,
//       microcredit: null,
//       microcreditsList: [],
//       setUser: (userData) => set({ user: userData }),
//       setToken: (token, expiresIn) => {
//         const expirationTime = new Date().getTime() + expiresIn;
//         set({ token, tokenExpiration: expirationTime });
//       },
//       clearUser: () => set({ user: null, token: null, tokenExpiration: null }),
//       isTokenValid: () => {
//         const state = get();
//         if (!state.token || !state.tokenExpiration) return false;
//         return new Date().getTime() < state.tokenExpiration;
//       },
//       setVerificationCode: (code) => set({ verificationCode: code }),
//       clearVerificationCode: () => set({ verificationCode: null }),
//       verifyCode: async (inputCode) => {
//         const state = get();
//         console.log("soy el email", state.user?.email);
//         console.log("soy el codigo", inputCode);
//         try {
//           const response = await fetch(
//             "https://i003-nativo-back-production.up.railway.app/api/autenticacion/verificacion-codigo",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 email: state.user?.email, // Envía el email del usuario
//                 verificationCode: inputCode, // El código ingresado
//               }),
//             },
//           );

//           const result = await response.json();
//           console.log(result);
//           if (response.status === 200) {
//             return true;
//           } else {
//             return false;
//           }
//         } catch (error) {
//           console.error("Error en la verificación del código:", error);
//           return false;
//         }
//       },
//       loginUser: async (email, password) => {
//         try {
//           const response = await fetch(
//             "https://i003-nativo-back-production.up.railway.app/api/autenticacion/inicio-sesion",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ email, password }),
//             },
//           );
//           if (response.ok) {
//             const result = await response.json();
//             set({ user: result.user });
//             set({ token: result.token });
//             set({ tokenExpiration: new Date().getTime() + result.expiresIn });
//             return true;
//           } else {
//             return false;
//           }
//         } catch (error) {
//           console.error("Error en el inicio de sesión:", error);
//           return false;
//         }
//       },
//       setMicrocreditsList: async () => {
//         const state = get();
//         const token = state.token;
//         if(!token) return;
//         try {
//           const result = await getHistoryMicrocreditsService(token);
//           set({ microcreditsList: result });
//           console.log(result);
//         } catch (error) {
//           console.error("Error al solicitar lista de créditos", error);
//         }
//       }
//     }),
//     {
//       name: "user-storage",
//       storage: createJSONStorage(() => sessionStorage),
//       partialize: (state) => ({
//         user: state.user,
//         token: state.token,
//         tokenExpiration: state.tokenExpiration,
//       }),
//     },
//   ),
// );

// export default useUserStore;

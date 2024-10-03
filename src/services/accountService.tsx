import useUserStore from "../store/useUserStore";

const api = import.meta.env.VITE_API_URL;

export async function getAccountInformation(id: string) {
  try {
    const token = useUserStore.getState().token;

    const response = await fetch(
      `${api}/api/cuenta/consultar-saldo/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      },
    );

    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al buscar información de la cuenta:", error);
    return null;
  }
}

export default {
  getAccountInformation,
};
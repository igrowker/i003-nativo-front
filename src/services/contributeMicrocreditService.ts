import useUserStore from "../store/useUserStore";

export async function contributeMicrocreditService( microcreditId: string, amount: number ) {
  try {
    const API_URL = import.meta.env.VITE_NATIVO_API_URL;
    const token = useUserStore.getState().token;
  
    const response = await fetch(`${API_URL}/api/microcreditos/contribuir`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        microcreditId,
        amount,
      }),
    });

    if (response.ok) {
      console.log('Respuesta exitosa:', response);
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al cargar la contribucion en la cuenta:", error);
    return null;
  }
}

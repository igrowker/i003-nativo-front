import useUserStore from "../store/useUserStore";

export async function contributeMicrocreditService(
  microcreditId: string,
  amount: number,
) {
  try {
    const api = import.meta.env.VITE_API_URL;
    const token = useUserStore.getState().token;

    const response = await fetch(`${api}/api/microcreditos/contribuir`, {
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
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al cargar la contribucion en la cuenta:", error);
    return null;
  }
}

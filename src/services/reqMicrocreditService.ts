export const requestMicrocreditService = async (
  token: string,
  amount: number,
  title: string,
  description: string,
) => {
  const api = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${api}/api/microcreditos/solicitar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        amount,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error("Error al solicitar el microcrédito");
    }
  } catch (error) {
    console.error("Error en la solicitud de microcrédito:", error);
    throw error;
  }
};

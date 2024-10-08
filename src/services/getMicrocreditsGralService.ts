export const getMicrocreditsGralService = async (token: string, microcreditStatus: string) => {
  const api = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${api}/api/microcreditos/historial-estados/${microcreditStatus}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error("Error al traer los datos");
    }
  } catch (error) {
    console.error("Error en la solicitud del historial de créditos", error);
    throw error;
  }
};

export const getHistoryMicrocreditsService = async (token: string) => {
  const API_URL = import.meta.env.VITE_NATIVO_API_URL;

  try {
    const response = await fetch(
      `${API_URL}/api/microcreditos/usuario-logueado`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

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
